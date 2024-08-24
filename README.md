# 군산대학교 컴퓨터공학부 커뮤니티앱개발 프로젝트

# kuna community app v1.0
> **군산대학교 인공지능융합과 KTC 동아리**<br/>**개발기간: 2024.08.01~**

## 배포주소
> **dev version** : <br />
> **server** : <br />

## 소개
|      김혁중       |                   |                |                                                                                                               
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
|   이미지    |                      이미지    |                   이미지   |
|   [@Dongubak](https://github.com/Dongubak)   |    [@user](https://github.com/user)  | [@user](https://github.com/user)  |
| 군산대학교 인공지능융합과 3학년 | 군산대학교 인공지능융합과 3학년 | 군산대학교 인공지능융합과 3학년 |

## 프로젝트 소개
> kuna community app은 군산대학교 컴퓨터공학부 학생들이 시간표 등록 및 일정 조율등을 할 수 있으며, 커뮤니티 게시판을 통해 여러 질의와 응답을 할 수 있습니다.


## 시작 가이드
> dev version은 공개하지 않으며 완성시 서버에 호스팅할 예정입니다.

## Stack

### Backend
- **Framework**: Koa
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JSON Web Token (JWT)
- **Validation**: Joi
- **Security**: Bcrypt, Sanitize-HTML
- **Environment Variables**: dotenv

### Frontend
- **Library**: React
- **State Management**: Redux, Redux-Saga
- **Routing**: React Router
- **Styling**: Styled-Components
- **Rich Text Editor**: Quill
- **Syntax Highlighting**: Prism.js, Highlight.js

### Development Tools
- **Backend**: Nodemon for development server
- **Frontend**: React Scripts for build and development
- **Testing**: React Testing Library, Jest
- **Linting**: ESLint with Prettier Configuration

## 주요 기능

### Authentication
> 토큰기반 로그인 기능, 페이지 이동시 마다 token을 이용한 auth check
### Set timetable
> 군산대학교 수강편람 데이터를 기반으로 timetable 구축 가능
### Arrange meeting
> 다른 user의 학번을 통해 미팅 시간 조율 가능
### Community(CRUID)
> 게시판 CRUID기능을 통해 다른 user와 커뮤니케이션 가능


## 디렉토리 구조

### Frontend
```bash
src                                      
├─ components                            
│  ├─ auth                               
│  │  ├─ AuthForm.js                     
│  │  └─ AuthTemplate.js                 
│  ├─ common                             
│  │  ├─ AskModal.js                     
│  │  ├─ Button.js                       
│  │  ├─ Header.js                       
│  │  ├─ Responsive.js                   
│  │  ├─ Sidebar.js                      
│  │  └─ SubInfo.js                      
│  ├─ course                             
│  │  └─ Course.js                       
│  ├─ courses                            
│  │  ├─ CourseForm.js                   
│  │  ├─ CourseList.js                   
│  │  ├─ Pagination.js                   
│  │  └─ TimeTable.js                    
│  ├─ post                               
│  │  ├─ AskRemoveModal.js               
│  │  ├─ PostActionButtons.js            
│  │  └─ PostViewer.js                   
│  ├─ posts                              
│  │  ├─ Pagination.js                   
│  │  └─ PostList.js                     
│  └─ write                              
│     ├─ Editor.js                       
│     └─ WriteActionButtons.js           
├─ containers                            
│  ├─ auth                               
│  │  ├─ LoginForm.js                    
│  │  └─ RegisterForm.js                 
│  ├─ common                             
│  │  └─ HeaderContainer.js              
│  ├─ courses                            
│  │  ├─ CourseFormContainer.js          
│  │  ├─ CourseListContainer.js          
│  │  ├─ PagenationContainer.js          
│  │  └─ TimeTableContainer.js           
│  ├─ post                               
│  │  └─ PostViewerContainer.js          
│  ├─ posts                              
│  │  ├─ PaginationContainer.js          
│  │  └─ PostListContainer.js            
│  └─ write                              
│     ├─ EditorContainer.js              
│     └─ WriteActionButtonsContainer.js  
├─ lib                                   
│  ├─ api                                
│  │  ├─ auth.js                         
│  │  ├─ cart.js                         
│  │  ├─ client.js                       
│  │  ├─ courses.js                      
│  │  └─ posts.js                        
│  ├─ styles                             
│  │  └─ palette.js                      
│  └─ createRequestSaga.js               
├─ modules                               
│  ├─ auth.js                            
│  ├─ blog-fronted.code-workspace        
│  ├─ cart.js                            
│  ├─ courses.js                         
│  ├─ index.js                           
│  ├─ loading.js                         
│  ├─ post.js                            
│  ├─ posts.js                           
│  ├─ user.js                            
│  └─ write.js                           
├─ pages                                 
│  ├─ CourseRegPage.js                   
│  ├─ LoginPage.js                       
│  ├─ PostListPage.js                    
│  ├─ PostPage.js                        
│  ├─ RegisterPage.js                    
│  └─ WritePage.js                       
├─ App.css                               
├─ App.js                                
├─ App.test.js                           
├─ index.css                             
├─ index.js                              
├─ logo.svg                              
├─ reportWebVitals.js                    
└─ setupTests.js   
```

### Backend               
```bash
backend
├── data                           
│   ├── major.json                  
│   ├── updated_major_circled.csv   
│   └── updated_major_circled.json  
│
├── models       
│   └── index.js  
│
├── src                       
│   ├── api                    
│   │   ├── auths               
│   │   │   ├── auths.ctrl.js    
│   │   │   └── index.js         
│   │   ├── cart                
│   │   │   ├── cart.ctrl.js     
│   │   │   └── index.js         
│   │   ├── courses             
│   │   │   ├── courses.ctrl.js  
│   │   │   └── index.js         
│   │   ├── posts               
│   │   │   ├── index.js         
│   │   │   └── posts.ctrl.js    
│   │   └── index.js            
│   │
│   ├── lib                    
│   │   └── jwtMiddleware.js    
│   │
│   ├── generateFakeData.js    
│   ├── index.js               
│   ├── main.js                
│   └── nonasync.js            
│
└── table               
    ├── comments.js      
    ├── courses.js       
    ├── posts.js         
    ├── user_courses.js  
    └── users.js         

```
<br />

# 개발진행

## Branch 종류

### Main branch
중앙 저장소에는 수명이 무한한 두 가지 메인 브랜치가 있음
1. master branch
2. develop branch

<br />

`master branch`는 사용자에게 배포 가능한 상태만을 관리함, 배포 이력을 관리하기 위해 사용한다<br />
함부로 master branch 에 merge 히지 말아야 함.<br /><br />
![alt text](/img/image-1.png) <br/>
<br /><br />

`develop branch`는 기능 개발을 위한 branch들을 병합하기 위해 사용함<br />
모든 기능이 추가되고 버그가 수정되어 배포 가능한 안정적인 상태라면 develop branch를 master에 merge한다.

### supporting branches
supporting branch를 사용하여 팀 구성원 간에 평행 개발을 할 수 있다.

1. feature branch
2. release branch
3. hotfix branch

`feature branch`는 새로운 기능 개발 및 버그 수정이 필요할 때 마다 develop branch로부터 분기한다. 이때 더 이상 필요하지 않은 branch는 삭제한다.<br />

`release branch`는 한 팀이 배포를 준비하는 동안 다른 팀은 다음 배포를 위한 기능 개발을 계속하게 해주는 브랜치이다. <br />

`hotfix branch`는 출시 버전에서 발생한 버그를 수정하는 브랜치 이다. 즉 master branch에서 분기하는 브랜치이다.


### branch naming convention

1. master branch
<br />
`master`와 `develop` 그대로 사용하는 것이 일반적이다.<br />

2. feature branch
<br />
어떤 이름도 가능하지만 `master`, `develop`, `release-...` 같은 이름은 사용할 수 없다.<br />
`feature/기능요약`형식이 일반적이다.

3. release branch
<br />
`release-RB_...` 또는 `release-...` 또는 `release/...` 같은 이름이 일반적이다.

4. hotfix branch
<br />
`fotfix-...`이 일반적이다.




![alt text](/img/image.png)

<hr />
<hr />
<hr />
# 테이블 구조

![alt text](/img/blog.png)



## 서버호스팅시 외부 접속 포트를 로컬 IP주소와 연결하는 포트포워딩
1. 방화벽이 외부에서 들어오는 요청을 허용해야함 <br />
    예시) 4000번 포트 사용시 방화벽에서 이 포트를 허용해야함

2. 네트워크 라우터가 외부에서 들어오는 요청을 허용해야 함 <br />
   -> 포트 포워딩 설정<br />
    외부에서 들어오는 특정포트를 서버의 로컬 IP주소와 해당 포트로 포워딩해야함

3. 서버가 실행중인 컴퓨터의 로컬 IP주소를 확인해야함<br />
   다른 기기가 이 컴퓨터로 접속할 때 사용하는 주소가 서버가 실행중인 로컬 IP주소이다.

>즉 외부에서 들어오는 특정 포트를 서버의 로컬 IP주소와 해당 포트로 포워딩 해야하한다.

```javascript
app.listen(4000, '0.0.0.0', () => {})
```

>모든 IP주소에서 오는 요청을 받아들일 수 있는 설정으로 (0.0.0.0)


## mysql 설치 및 dbeaver와 연동
mysql 설치 부분 : https://deep-jin.tistory.com/entry/mac-MySQL-설치
mysql과 dbeaver 연동 : https://velog.io/@black_han26/DBeaver-MySQL-연동

## 외래키 제약 조건 오류
간단한 포스트 요청시 외래키 제약 조건 오류가 발생한 것을 확인하였고
user_id가 1인 사용자가 user table에 존재하지 않아 외래키 제약 조건 오류가 발생하였다는 것을 확인했음

이를 해결하기 위해서 user table에 임의로 한개의 유저를 추가하여 id를 부여했으며
포스트 요청시에 그 유저가 작성한 것으로 요청을 완료하였음

이같이 외래키로 연결되어 있는 부분들이 많은 것으로 확인 되니 오류 발생시에 외래키 제약 조건을 확인할 필요가 있어보임

## Joi를 통한 타당성 검사
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

## 여러 query 방법
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

## pagenation 구현
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

## bcrypt를 통한 비밀번호 해싱
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


