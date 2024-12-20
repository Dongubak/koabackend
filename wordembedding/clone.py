import argparse

import os
import re
import time
import pickle
import pandas as pd
from tqdm import tqdm
from tqdm import trange
import warnings

warnings.filterwarnings("ignore")

import requests
from urllib.request import urlopen, Request
from fake_useragent import UserAgent
import json

import selenium
from selenium import webdriver
from selenium.webdriver import ActionChains

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

# 스크롤 내리기
def scroll_bottom():
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")


# 1. 해당 카테고리 음식점 리스트 리턴
def get_restaurant_list(lat, lng, items=500):
    """
    >>> get_restaurant_list(37.56, 126.93, 20)
    'Request api for 20 restaurants 
    that fit a specific option 
    based on latitude 37.56 and longitude 126.93'
    """
    restaurant_list = []
    # 헤더 선언 및 referer, User-Agent 전송
    headers = {
        "referer": "https://www.yogiyo.co.kr/mobile/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
        "Accept": "application/json",
        "x-apikey": "iphoneap",
        "x-apisecret": "fe5183cc3dea12bd0ce299cf110a75a2",
    }
    params = {
        "items": items,
        "lat": lat,
        "lng": lng,
        "order": ORDER_OPTION,
        "page": 0,
        "search": "",
    }
    host = "https://www.yogiyo.co.kr"
    path = "/api/v2/restaurants"
    
    url = host+path
    # url = f"https://www.yogiyo.co.kr/api/v2/restaurants?items=60&lat=35.981742&lng=126.71587056&order=rank&page=0&search=&serving_type=vd"

    response = requests.get(url, headers=headers, params=params)
    print(response.json())
    count = 0
    for item in response.json()["restaurants"]:
        restaurant_list.append(item["id"])
        count += 1
    print(restaurant_list)
    return list(set(restaurant_list))


# 2. 검색한 음식점 페이지 들어가기
def go_to_restaurant(id):
    try:
        restaurant_url = "https://www.yogiyo.co.kr/mobile/#/{}/".format(id)
        driver.get(url=restaurant_url)
        print(driver.current_url)
    except Exception as e:
        print("go_to_restaurant 에러")
    time.sleep(5)


# 3-1. 해당 음식점의 정보 페이지로 넘어가기
def go_to_info():
    print("정보 페이지 로드중...")
    driver.find_element(By.XPATH,'//*[@id="content"]/div[2]/div[1]/ul/li[3]/a').click()
    time.sleep(2)
    print("정보 페이지 로드 완료!")


# 3-2. 정보 더보기 클릭하기
def get_info():
    op_time = driver.find_element(By.XPATH,'//*[@id="info"]/div[2]/p[1]/span').text
    addr = driver.find_element(By.XPATH,'//*[@id="info"]/div[2]/p[3]/span').text
    
        
    try:
        number = driver.find_element(By.XPATH,'//*[@id="info"]/div[2]/p[2]/span').text
    except Exception as e:
        number = "정보 없음"
    
    print(f"영업시간: {op_time}, 주소: {addr}, 번호: {number}")
    
    return op_time, addr, number


# 4-1. 해당 음식점의 리뷰 페이지로 넘어가기
def go_to_review():
    print("리뷰 페이지 로드중...")
    driver.find_element(By.XPATH,'//*[@id="content"]/div[2]/div[1]/ul/li[2]/a').click()
    time.sleep(2)
    print("리뷰 페이지 로드 완료!")


# 4-2. 리뷰 더보기 클릭하기
def click_more_review():
    driver.find_element(By.CLASS_NAME, "btn-more").click()
    time.sleep(2)


# 5. 리뷰 페이지 모두 펼치기
def stretch_review_page():
    review_count = int(
        driver.find_element(By.XPATH,'//*[@id="content"]/div[2]/div[1]/ul/li[2]/a/span').text
    )
    click_count = int((review_count / 10))
    print("모든 리뷰 불러오기 시작...")
    for _ in trange(click_count):
        try:
            scroll_bottom()
            click_more_review()
        except Exception as e:
            pass
    scroll_bottom()
    print("모든 리뷰 불러오기 완료!")


# 6. 해당 음식점의 모든 리뷰 객체 리턴
def get_all_review_elements():
    reviews = driver.find_elements(By.CSS_SELECTOR,
        "#review > li.list-group-item.star-point.ng-scope"
    )
    return reviews


# 7. 페이지 뒤로 가기 (한 음식점 리뷰를 모두 모았으면 다시 음식점 리스트 페이지로 돌아감)
def go_back_page():
    print("페이지 돌아가기중...")
    driver.execute_script("window.history.go(-1)")
    time.sleep(2)
    print("페이지 돌아가기 완료!" + "\n")


# 8. 크롤링과 결과 데이터를 pickle 파일과 csv파일로 저장
def save_pickle_csv(location, yogiyo_df):
    # 'data' 디렉토리가 없으면 생성
    if not os.path.exists('data'):
        os.makedirs('data')
        
    yogiyo_df.to_csv("./data/위도{}_경도{}_df.csv".format(location[0], location[1]))
    yogiyo_df.to_excel("./data/위도{}_경도{}_df.xlsx".format(location[0], location[1]))
    pickle.dump(yogiyo_df, open("./data/위도{}_경도{}_df.pkl".format(location[0], location[1]), "wb"))
    print("{} {} pikcle save complete!".format(location[0], location[1]))


# 9. 크롤링 메인 함수 (카테고리, 거리, 가격 정보를 추가한 데이터 프레임 구조)
def yogiyo_crawling(location):
    df = pd.DataFrame(
        columns=[
            "Restaurant", "UserID", "Menu", "Review", "Total", "Taste",
            "Quantity", "Delivery", "Date", "OperationTime", "Address","Number"
        ]
    )

    try:
        restaurant_list = get_restaurant_list(location[0], location[1], RESTAURANT_COUNT)

        for restaurant_id in restaurant_list:
            try:
                print(f"********** {restaurant_list.index(restaurant_id) + 1}/{len(restaurant_list)} 번째 **********")
                
                go_to_restaurant(restaurant_id)
                go_to_info()
                
                op_time, addr, number = get_info()
                
                go_to_review()
                stretch_review_page()

                for review in tqdm(get_all_review_elements()):
                    try:
                        df.loc[len(df)] = {
                            "Restaurant": driver.find_element(By.CLASS_NAME,"restaurant-name").text,
                            "UserID": review.find_element(By.CSS_SELECTOR,"span.review-id.ng-binding").text,
                            "Menu": review.find_element(By.CSS_SELECTOR,"div.order-items.default.ng-binding").text,
                            "Review": review.find_element(By.CSS_SELECTOR,"p").text,
                            "Total": str(len(review.find_elements(By.CSS_SELECTOR,"div > span.total > span.full.ng-scope"))),
                            "Taste": review.find_element(By.CSS_SELECTOR,"div:nth-child(2) > div > span.category > span:nth-child(3)").text,
                            "Quantity": review.find_element(By.CSS_SELECTOR,"div:nth-child(2) > div > span.category > span:nth-child(6)").text,
                            "Delivery": review.find_element(By.CSS_SELECTOR,"div:nth-child(2) > div > span.category > span:nth-child(9)").text,
                            "Date": review.find_element(By.CSS_SELECTOR,"div:nth-child(1) > span.review-time.ng-binding").text,
                            "OperationTime": op_time,
                            "Address": addr,
                            "Number" : number
                        }
                    except Exception as e:
                        print("리뷰 페이지 에러")
                        print(e)
                        pass

            except Exception as e:
                print(f"*** 음식점 ID: {restaurant_id} *** 음식점 페이지 에러")
                go_back_page()
                print(e)
                pass

            print("음식점 리스트 페이지로 돌아가는중...")
            go_back_page()

    except Exception as e:
        print("음식점 리스트 페이지 에러")
        print(e)
        pass

    print(f"End of [ {location[0]} - {location[1]} ] Crawling!")
    save_pickle_csv(location, df)
    print(f"{location[0]} {location[1]} crawling finish!!!")

    return df


# 10. 요기요 크롤링 실행 함수 (사용자에 맞게 수정 가능)
def start_yogiyo_crawling():

    locations = [[LAT, LON]]

    for location in locations:
        try:
            yogiyo = yogiyo_crawling(location)
        except Exception as e:
            print(e)
            pass


parser = argparse.ArgumentParser(description="Arguments for Crawler")
parser.add_argument(
    "--order",
    required=False,
    default="distance",
    help="option for restaurant list order / choose one \
    -> [rank, review_avg, review_count, min_order_value, distance, estimated_delivery_time]",
)
parser.add_argument("--num", required=False, default=500, help="option for restaurant number")
parser.add_argument("--lat", required=False, default=35.9470221, help="latitude for search")
parser.add_argument("--lon", required=False, default=126.6815184, help="longitude for search")
args = parser.parse_args()

ORDER_OPTION = args.order
RESTAURANT_COUNT = int(args.num)
LAT = float(args.lat)
LON = float(args.lon)

# 크롬 드라이버 경로 설정 (절대경로로 설정하는 것이 좋음)
chromedriver = "C:\\Users\\Multi 03\\Documents\\chromedriver-win64\\chromedriver.exe"
chrome_options = Options()
chrome_options.add_argument('--disable-deprecated-web-platform-features')
service = Service(executable_path=chromedriver)
driver = webdriver.Chrome(service=service, options=chrome_options)
# driver = webdriver.Chrome(chromedriver)

url = "https://www.yogiyo.co.kr/mobile/#/"

# fake_useragent 모듈을 통한 User-Agent 정보 생성
useragent = UserAgent()
print(useragent.chrome)
print(useragent.ie)
print(useragent.safari)
print(useragent.random)

driver.get(url=url)
print(driver.current_url)

start_yogiyo_crawling()