## 서버 호스팅 과정

1. 방화벽이 외부에서 들어오는 요청을 허용해야함
    예시) 4000번 포트 사용시 방화벽에서 이 포트를 허용해야함

2. 네트워크 라우터가 외부에서 들어오는 요청을 허용해야 함
   -> 포트 포워딩 설정
    외부에서 들어오는 특정포트를 서버의 로컬 IP주소와 해당 포트로 포워딩해야함

3. 서버가 실행중인 컴퓨터의 로컬 IP주소를 확인해야함
   다른 기기가 이 컴퓨터로 접속할 때 사용하는 주소가 서버가 실행중인 로컬 IP주소이다.

즉 외부에서 들어오는 특정 포트를 서버의 로컬 IP주소와 해당 포트로 포워딩 해야하한다.

```javascript
app.listen(4000, '0.0.0.0', () => {})
```

모든 IP주소에서 오는 요청을 받아들일 수 있는 설정으로 (0.0.0.0)


mysql 설치 부분 : https://deep-jin.tistory.com/entry/mac-MySQL-설치
mysql과 dbeaver 연동 : https://velog.io/@black_han26/DBeaver-MySQL-연동

간단한 포스트 요청시 외래키 제약 조건 오류가 발생한 것을 확인하였고
user_id가 1인 사용자가 user table에 존재하지 않아 외래키 제약 조건 오류가 발생하였다는 것을 확인했음

이를 해결하기 위해서 user table에 임의로 한개의 유저를 추가하여 id를 부여했으며
포스트 요청시에 그 유저가 작성한 것으로 요청을 완료하였음

이같이 외래키로 연결되어 있는 부분들이 많은 것으로 확인 되니 오류 발생시에 외래키 제약 조건을 확인할 필요가 있어보임

```javascript
const schema = Joi.object({
      title: Joi.string().required(), // 필수 문자열
      body: Joi.string().required(), // 필수 문자열
      user_id: Joi.number().integer().required(), // 필수 정수
});
```

Joi를 사용해서 필요한 필드가 존재하는지 검사할 수 있으며
[
    {
        "message": "\"title\" is required",
        "path": [
            "title"
        ],
        "type": "any.required",
        "context": {
            "label": "title",
            "key": "title"
        }
    }
]
필드가 빠져 있다면 위 응답을 받을 수 있다.


포스트 역순 조회
```javascript
exports.list = async (ctx) => {
    try {
        const posts = await Post.findAll({
            order: [['id', 'DESC']] // id를 기준으로 내림차순 정렬
        });
        ctx.body = posts;
    } catch (error) {
        ctx.throw(500, error);
    }
};
```

가져오는 포스트의 개수 제한시키기

```javascript
exports.list = async (ctx) => {
   try {
      const posts = await Post.findAll({
         order: [['id', 'DESC']], // id를 기준으로 내림차순 정렬
         limit: 10 // 가져올 레코드 수 제한
      });
      ctx.body = posts;
   } catch (error) {
      ctx.throw(500, error);
   }
};

```

페이지 구현

```javascript
exports.list = async (ctx) => {
   // 쿼리 파라미터로 페이지 번호와 페이지당 레코드 수를 받아옵니다.
   const page = parseInt(ctx.query.page, 10) || 1; // 기본값은 1
   const limit = parseInt(ctx.query.limit, 10) || 10; // 기본값은 10
   const offset = (page - 1) * limit;

   try {
      // 페이지네이션을 적용하여 레코드를 조회합니다.
      const posts = await Post.findAll({
         order: [['id', 'DESC']], // id를 기준으로 내림차순 정렬
         limit, // 페이지당 레코드 수
         offset // 시작점
      });

      // 전체 레코드 수를 조회하여 총 페이지 수를 계산합니다.
      const totalPosts = await Post.count();
      const totalPages = Math.ceil(totalPosts / limit);

      ctx.body = {
         posts,
         pagination: {
               totalPosts,
               totalPages,
               currentPage: page
         }
      };
   } catch (error) {
      ctx.throw(500, error);
   }
};
```

http://localhost:4000/api/posts?page=1&limit=10

이로서 페이지와 보여주는 게시글의 양을 쿼리로 전달할 수 있다.


bcrypt 를 이용한 비밀번호 해싱 후 compare 함수 정의
```javascript
const { User } = require('./models');

// 예제 비밀번호
const inputPassword = 'password123';
const user = await User.findOne({ where: { username: 'john_doe' } });

if (user) {
    const isMatch = await User.comparePassword(inputPassword, user.password);
    if (isMatch) {
        console.log('비밀번호가 일치합니다.');
    } else {
        console.log('비밀번호가 일치하지 않습니다.');
    }
} else {
    console.log('사용자를 찾을 수 없습니다.');
}

```

```javascript
const { User } = require('./models');

// 예제 username
const username = 'john_doe';

async function getUserData(username) {
    try {
        const user = await User.findByUsername(username);
        if (user) {
            console.log('사용자 데이터:', user);
        } else {
            console.log('사용자를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('사용자 조회 중 오류 발생:', error);
    }
}

getUserData(username);

```

회원가입 예제

url : http://localhost:4000/api/auths/register

body : {
    "username": "john_doe1",
    "password": "password123"
}

response : {
    "message": "User registered successfully",
    "user": {
        "id": 2,
        "username": "john_doe1",
        "password": "$2b$10$dnwqiggWPevJu1PDtmVb5.mcTJvxVtFurYdOZ1VwKWKXjX1RnhAiC"
    }
}

유저 조회

url : http://localhost:4000/api/auths/user/john_doe1

response : {
    "id": 2,
    "username": "john_doe1",
    "password": "$2b$10$dnwqiggWPevJu1PDtmVb5.mcTJvxVtFurYdOZ1VwKWKXjX1RnhAiC"
}


