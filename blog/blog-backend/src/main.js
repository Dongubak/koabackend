const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const {sequelize} = require('../models');
const api = require('./api');
require('dotenv').config();

const serve = require('koa-static');
const path = require('path');
const send = require('koa-send');

const app = new Koa();
app.use(cors());

sequelize.sync({force : false}) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드 
// force : true 로 해놓으면 서버 재시작마다 테이블이 재생성됨. 테이블을 잘못 만든 경우에 true 로 설정
.then(() => {
   console.log('데이터 베이스 연결 성공');
})
.catch((err) => {
   console.log(err);
});
const router = new Router();
router.use('/api', api.routes());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
/// app instance 에 router를 적용함



// 프론트 빌드 서브할 경우

const buildDirectory = path.resolve(__dirname, '../../blog-fronted/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  // Not Found 이고, 주소가 /api 로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // index.html 내용을 반환
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

/// package.json의 start:dev는 main.js 서브

// 외부 접속을 허용할 경우
app.listen(48889, '0.0.0.0', () => {
   console.log('Listening to port 48889');
});

///외부 접속 차단 경우
// app.listen(4000, () => {
//    console.log('Listening to port 4000');
// });