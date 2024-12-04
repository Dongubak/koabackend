# 진행
## test.ipynb
시간표 데이터를 파싱하는 코드

## clone.py
요기요에서 학교 좌표기준 10-09일까지 작성된 232개의 가게에 달린 리뷰와 정보를 파싱하는 코드

## ./data
파싱한 리뷰 데이터를 저장하는 공간<br>
파싱한 데이터를 기준으로 온도, 양식, 맵기, 종류, 배달시간등을 평가를 내려 단어임베딩의 데이터로 사용할 예정
### 10-10
파싱한 리뷰데이터의 메뉴의 전처리에 들어감<br>
확인 결과 )의 데이터가 남는 결과가 있었음<br>
MZ한 가게는 음식의 이름이 쓸모 없이 길었고, 음식이름으로 음식의 종류를 판단하기 힘듬
<br><br>
핵심은 리뷰 데이터의 전처리에 어려움을 겪음<br>
너무 짧은 데이터는 판단의 자료로 쓸수 없으니 제거하고, <br>
종종 냉면인데 밥으로 분류하는 경우가 있었기에 음식의 종류와 양식은 메뉴에서 결정해야 할 듯함