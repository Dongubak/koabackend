const { Post, User } = require('../../../models');
const sanitizeHtml = require('sanitize-html');
const Joi = require('joi');


const checkOwnership = async (ctx, postId) => {
   const post = await Post.findByPk(postId);
   if (!post) {
      ctx.status = 404;
      ctx.body = { message: 'Post not found' };
      return null;
   }

   console.log('ctx.state.user:', ctx.state.user); // 디버깅 로그 추가
   if (post.user_id !== ctx.state.user.id) {
      ctx.status = 403;
      ctx.body = { message: 'You are not authorized to perform this action' };
      return null;
   }

   return post;
};

const removehtmlAndShorten = body => {
   const filtered = sanitizeHtml(body, {
      allowedTags: [],
   });

   return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
}

const sanitizeOption = {
   allowedTags: [
      'h1', 'h2', 'b', 'i', 'u', 's', 'p', 'ul', 'ol', 'li', 'blockquote', 'a', 'img'
   ],
   allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
      li: ['class'],
   },
   allowedSchemes: ['data', 'http'],
};

exports.write = async (ctx) => {
   const { title, body, user_id, subject } = ctx.request.body;

   const schema = Joi.object({
      title: Joi.string().required(), // 필수 문자열
      body: Joi.string().required(), // 필수 문자열
      user_id: Joi.number().integer().required(), // 필수 정수
      subject: Joi.string().valid('community', 'announcement', 'knowledge', 'qna').default('community') // 유효한 subject 값
   });

   // 검증 후, 검증 실패 시 에러 처리
   const { error } = schema.validate(ctx.request.body);
   if (error) {
      ctx.status = 400; // Bad Request
      ctx.body = error.details;
      return;
   }

   try {
      const post = await Post.create({
         title,
         body: sanitizeHtml(body, sanitizeOption),
         user_id,
         subject, // subject 필드 추가
      });
      ctx.body = post;
   } catch (error) {
      console.error(error); // 로그 추가
      ctx.throw(500, error);
   }
};

exports.list = async (ctx) => {
   // 쿼리 파라미터로 페이지 번호와 페이지당 레코드 수, 사용자 이름, subject를 받아옵니다.
   const { page: qpage, limit: qlimit, username, subject } = ctx.query;

   const page = parseInt(qpage, 10) || 1; // 기본값은 1
   const limit = parseInt(qlimit, 10) || 5; // 기본값은 5
   const offset = (page - 1) * limit;

   try {
       // 조건에 따라 쿼리 옵션을 설정합니다.
       const userWhere = username ? { username } : {};
       const postWhere = subject ? { subject } : {};

       // 페이지네이션과 조인을 적용하여 레코드를 조회합니다.
       const posts = await Post.findAll({
           include: [{
               model: User,
               where: userWhere, // username이 주어진 경우 필터링
               attributes: ['username'] // 결과에 포함할 User 테이블의 컬럼들
           }],
           where: postWhere, // subject가 주어진 경우 필터링
           order: [['created_date', 'DESC']], // 날짜 순으로
           limit, // 페이지당 레코드 수
           offset // 시작점
       });

       // 전체 레코드 수를 조회하여 총 페이지 수를 계산합니다.
       const totalPosts = await Post.count({
           include: [{
               model: User,
               where: userWhere
           }],
           where: postWhere // subject가 주어진 경우 필터링
       });
       const totalPages = Math.ceil(totalPosts / limit);

       // 응답 객체를 원하는 형태로 변환
       const formattedPosts = posts.map(post => ({
           id: post.id,
           title: post.title,
           body: removehtmlAndShorten(post.body),
           user_id: post.user_id,
           created_date: post.created_date,
           username: post.User.username, // User 객체에서 username 추출
           subject: post.subject
       }));

       ctx.body = {
           posts: formattedPosts,
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

exports.read = async (ctx) => {
   const { id } = ctx.params;
   try {
       const post = await Post.findOne({
           where: { id },
           include: [{
               model: User,
               attributes: ['username'] // 결과에 포함할 User 테이블의 컬럼들
           }]
       });
       if (!post) {
           ctx.status = 404;
           return;
       }

       // 응답 객체를 원하는 형태로 변환
       const response = {
           id: post.id,
           title: post.title,
           body: post.body,
           user_id: post.user_id,
           created_date: post.created_date,
           subject: post.subject,
           username: post.User.username // User 객체에서 username 추출
       };

       ctx.body = response;
   } catch (error) {
       ctx.throw(500, error);
   }
};

exports.update = async (ctx) => {
   // 요청 데이터 검증
   const schema = Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
   });

   const { error, value } = schema.validate(ctx.request.body);
   if (error) {
      ctx.status = 400;
      ctx.body = error.details;
      return;
   }

   const { title, body } = value;
   const { id } = ctx.params; // URL 파라미터에서 포스트 ID를 가져옴
   
   try {
      const post = await checkOwnership(ctx, id);
      if (!post) return; // 권한이 없거나 포스트가 없으면 함수 종료

      post.title = title;
      post.body = body;
      await post.save();

      ctx.body = post;
   } catch (error) {
      ctx.throw(500, error);
   }
};

exports.remove = async (ctx) => {
   const { id } = ctx.params; // URL 파라미터에서 포스트 ID를 가져옴

   try {
      const post = await checkOwnership(ctx, id);
      if (!post) return; // 권한이 없거나 포스트가 없으면 함수 종료

      await post.destroy();
      ctx.status = 204; // No Content
   } catch (error) {
      ctx.throw(500, error);
   }
};