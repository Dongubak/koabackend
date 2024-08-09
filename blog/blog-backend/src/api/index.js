const Router = require('koa-router');
const posts = require('./posts');
const auths = require('./auths')

const api = new Router();

// api.get('/test', ctx => {
//    ctx.body = 'test 성공';
// });

api.use('/posts', posts.routes());
api.use('/auths', auths.routes());

module.exports = api;

/// 라우터를 여러 파일에 분리시켜서 작성하고, 이를 불러와서 사용함