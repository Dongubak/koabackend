from flask import Flask, request, jsonify, make_response
from flask_cors import CORS  
import pandas as pd
import numpy as np
from gensim.models import Word2Vec
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from waitress import serve
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(app, resources={r"/*": {"origins": "*"}})  


file_path = r'C:\Users\Multi 03\Desktop\code\reviewdata.xlsx'
try:
    review_data = pd.read_excel(file_path)
except FileNotFoundError:
    raise FileNotFoundError(f"File not found: {file_path}")
except Exception as e:
    raise Exception(f"Error loading file: {e}")

stop_words_ko = [
    "수", "것", "들", "점", "등", "더", "이", "그", "저", 
    "때", "거", "왜", "이런", "저런", "그런", "너무", "정말", 
    "진짜", "좀", "많이", "안", "못", "매우", "아주"
]

def preprocess_text(text):
    text = re.sub(r'[^a-zA-Z가-힣\s]', '', str(text)) 
    text = text.lower() 
    tokens = [word for word in text.split() if word not in stop_words_ko] 
    return tokens

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

@app.after_request
def apply_cors(response):
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.charset = 'utf-8'
    return response

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask API!"

@app.route('/recommend', methods=['GET'])
def recommend():
    base_word = request.args.get('word')

    if not base_word:
        return make_response(jsonify({"error": "The 'word' field is required."}), 400)
    
    recommendations = recommend_specific_menu_and_restaurants(base_word, top_n=5)
    response = make_response(
        json.dumps(recommendations, ensure_ascii=False, indent=2,allow_nan=False), 
        200
    )
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response
    #return make_response(jsonify(recommendations, ensure_ascii=False), 200)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "OK", "message": "The server is running!"})


url = "https://www.kunsan.ac.kr/dormi/index.kunsan?menuCd=DOM_000000704006003000&&cpath=%2Fdormi"


def fetch_and_parse():
    response = requests.get(url)
    response.encoding = 'utf-8' 
    html_content = response.text
    soup = BeautifulSoup(html_content, "html.parser")
    return soup

def parse_operating_hours(soup):
    hours = {}
    table = soup.find("table", class_="ctable01")
    rows = table.find_all("tr")[1:] 
    
    for row in rows:
        cells = row.find_all("td")
        if len(cells) > 0:
            day_type = row.find("th", scope="row").get_text(strip=True)
            weekdays_hours = cells[0].get_text(strip=True)
            holidays_hours = cells[1].get_text(strip=True) if len(cells) > 1 else ""
            dinner_hours = cells[2].get_text(strip=True) if len(cells) > 2 else ""
            hours[day_type] = {"평일": weekdays_hours, "공휴일": holidays_hours, "저녁": dinner_hours}
    
    return hours

def parse_weekly_menu(soup):
    menu = {"아침": {}, "점심": {}, "저녁": {}}
    table = soup.find("table", style="-ms-word-break: break-all;")
    rows = table.find_all("tr")[1:] 
    
    meal_times = ["아침", "점심", "저녁"]
    for i, row in enumerate(rows):
        meal_type = meal_times[i]
        cells = row.find_all("td")
        days = ["월", "화", "수", "목", "금", "토", "일"]
        for j, cell in enumerate(cells):
            day = days[j]
            menu[meal_type][day] = cell.get_text(separator=", ", strip=True)
    
    return menu

def get_today_menu(menu):
    days = ["월", "화", "수", "목", "금", "토", "일"]
    today_day = days[datetime.today().weekday()] 
    day_menu = {}
    for meal_time in menu:
        if today_day in menu[meal_time]:
            day_menu[meal_time] = menu[meal_time][today_day]
        else:
            day_menu[meal_time] = "메뉴 없음"
    return today_day, day_menu

@app.route('/time', methods=['GET'])
def time():
    soup=fetch_and_parse()
    operating_hours = parse_operating_hours(soup)
    
    response = make_response(
        json.dumps(operating_hours, ensure_ascii=False, indent=2), 
        200
    )
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@app.route('/weekly', methods=['GET'])
def weekly_Menu():
    soup=fetch_and_parse()
    operating_hours = parse_weekly_menu(soup)
    
    response = make_response(
        json.dumps(operating_hours, ensure_ascii=False, indent=2), 
        200
    )
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

def split_menu_items(menu_dict):
    result = {}
    for meal_time, menu_string in menu_dict.items():
        menu_items = [item.strip() for item in menu_string.split(',')]
        
        result[meal_time] = menu_items
            
    
    return result

@app.route('/today', methods=['GET'])
def today_Menu():
    soup=fetch_and_parse()
    weekly_menu = parse_weekly_menu(soup)
    today_day, today_menu = get_today_menu(weekly_menu)
    operating_hours = parse_operating_hours(soup)
    
    menu= split_menu_items(today_menu)
    
    response = make_response(
        json.dumps({
            "day": today_day,
            "menu": menu,
            "time": operating_hours
        }, ensure_ascii=False, indent=2), 
        200
    )
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response




# 애플리케이션 실행
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=43306,debug=True)
    #serve(app,host='0.0.0.0', port=43306)
