const Router = require('koa-router');
const meetingsCtrl = require('./meetings.ctrl');

const meetings = new Router();

// const printInfo = ctx => {
//    ctx.body = {
//       method: ctx.method,
//       path: ctx.path,
//       params: ctx.params,
//    };
// };
meetings.get('/', meetingsCtrl.init);
meetings.get('/listGroupTimeTable', meetingsCtrl.listGroupTimeTable);
meetings.get('/searchUsername', meetingsCtrl.searchUsername);
meetings.post('/addMeetingGroup', meetingsCtrl.addMeetingGroup);
meetings.delete('/deleteMeetingGroup', meetingsCtrl.deleteMeetingGroup);
meetings.put('/updateMeetingGroup', meetingsCtrl.updateMeetingGroup);
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
 
module.exports = meetings;