from flask import Flask, request, jsonify, send_file
import pandas as pd
import numpy as np
from gensim.models import Word2Vec
import re

# Flask 애플리케이션 초기화
app = Flask(__name__)

# 데이터 로드 및 전처리
file_path = r'C:\Users\Multi 03\Desktop\code\reviewdata.xlsx'
review_data = pd.read_excel(file_path)

stop_words_ko = [
    "수", "것", "들", "점", "등", "더", "이", "그", "저", 
    "때", "거", "왜", "이런", "저런", "그런", "너무", "정말", 
    "진짜", "좀", "많이", "안", "못", "매우", "아주"
]

def preprocess_text(text):
    text = re.sub(r'[^a-zA-Z가-힣\s]', '', str(text))  # 특수 문자 제거
    text = text.lower()  # 소문자로 변환
    tokens = [word for word in text.split() if word not in stop_words_ko]  # 불용어 제거
    return tokens

# 데이터 전처리 및 Word2Vec 학습
review_data['Processed_Text'] = review_data['Review'].fillna('').astype(str) + ' ' + review_data['Menu'].fillna('')
review_data['Tokens'] = review_data['Processed_Text'].apply(preprocess_text)
sentences = review_data['Tokens'].tolist()
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

def text_to_vector(tokens, model):
    vectors = [model.wv[token] for token in tokens if token in model.wv]
    if vectors:
        return np.mean(vectors, axis=0)
    else:
        return np.zeros(model.vector_size)

review_data['Vector'] = review_data['Tokens'].apply(lambda x: text_to_vector(x, model))

def recommend_specific_menu_and_restaurants(base_word, top_n=5):
    if base_word not in model.wv:
        return {"error": f"The word '{base_word}' is not in the vocabulary."}

    similar_words = model.wv.most_similar(base_word, topn=top_n)

    results = []
    for similar_word, similarity_score in similar_words:
        matching_rows = review_data[review_data['Tokens'].apply(lambda tokens: similar_word in tokens)]
        
        for _, row in matching_rows.iterrows():
            results.append({
                "Similar Word": similar_word,
                "Similarity Score": float(similarity_score),
                "Restaurant": row['Restaurant'],
                "Menu": row['Menu'],
                "Review": row['Review']
            })

    results_df = pd.DataFrame(results)
    results_df = results_df.drop_duplicates(subset=["Similar Word", "Restaurant"])
    results_df = results_df.sort_values(by="Similarity Score", ascending=False)
    
    return results_df.to_dict(orient='records')

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask API!"

# Flask 라우트 정의
@app.route('/recommend', methods=['GET'])
def recommend():
    base_word = request.args.get('word')


    if not base_word:
        return jsonify({"error": "The 'word' field is required."}), 400

    recommendations = recommend_specific_menu_and_restaurants(base_word, top_n=5)  # top_n 고정
    return jsonify(recommendations)

@app.route('/a', methods=['GET'])
def a():
    word = request.args.get('word')
    
    # 디버깅 및 확인용 출력
    print(f"Received word: {word}")
    
    # 응답 반환
    return f"Received word: {word}"


# 애플리케이션 실행
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=43306, debug=True)
