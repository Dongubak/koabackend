const { Post } = require('../models');

// 무작위 문자열 생성 함수
const getRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// 가짜 포스트 데이터 생성 함수
const generateFakePosts = async () => {
    const fakePosts = [];

    for (let i = 0; i < 40; i++) {
        const title = getRandomString(20); // 제목은 20자 길이의 무작위 문자열
        const body = getRandomString(200); // 본문은 200자 길이의 무작위 문자열
        const user_id = 2; // 모든 포스트는 user_id가 1인 사용자가 작성한 것으로 설정

        fakePosts.push({ title, body, user_id });
    }

    try {
        // 데이터베이스에 가짜 포스트 삽입
        await Post.bulkCreate(fakePosts);
        console.log('40개의 가짜 포스트가 성공적으로 생성되었습니다.');
    } catch (error) {
        console.error('가짜 포스트 생성 중 오류 발생:', error);
    }
};

generateFakePosts();
