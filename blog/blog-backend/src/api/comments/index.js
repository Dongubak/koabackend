const Router = require('koa-router');
const commentsCtrl = require('./comments.ctrl');
const authMiddleware = require('../../lib/jwtMiddleware');

const comments = new Router();

// 댓글 작성 (로그인 필요)
comments.post('/', authMiddleware, commentsCtrl.create);

// 특정 게시글의 댓글 목록 조회 (페이지네이션 포함)
comments.get('/', commentsCtrl.list); // 쿼리로 전달된 post_id에 해당하는 댓글 보여주기

// 댓글 삭제 (로그인 필요)
comments.delete('/:id', authMiddleware, commentsCtrl.remove);

// 댓글 수정 (로그인 필요)
comments.patch('/:id', authMiddleware, commentsCtrl.update);

module.exports = comments;