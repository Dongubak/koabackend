const Router = require('koa-router');
const courseCtrl = require('./courses.ctrl');

const courses = new Router();

// const printInfo = ctx => {
//    ctx.body = {
//       method: ctx.method,
//       path: ctx.path,
//       params: ctx.params,
//    };
// };
courses.get('/', courseCtrl.list);


// posts.get('/', postsCtrl.list);
// // http://localhost:4000/api/posts/
// posts.post('/', postsCtrl.write);
// // http://localhost:4000/api/posts?id=19
// posts.get('/:id', postsCtrl.read);
// // http://localhost:4000/api/posts/12
// posts.delete('/:id', postsCtrl.remove);
// // http://localhost:4000/api/posts/12
// posts.put('/:id', postsCtrl.replace);
// // http://localhost:4000/api/posts/12
// posts.patch('/:id', postsCtrl.update);
// // http://localhost:4000/api/posts/12

module.exports = courses;