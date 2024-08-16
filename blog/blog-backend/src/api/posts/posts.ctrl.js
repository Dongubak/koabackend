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
   const { title, body, user_id } = ctx.request.body;

   const schema = Joi.object({
      title: Joi.string().required(), // 필수 문자열
      body: Joi.string().required(), // 필수 문자열
      user_id: Joi.number().integer().required(), // 필수 정수
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
         user_id 
      });
      ctx.body = post;
   } catch (error) {
      console.error(error); // 로그 추가
      ctx.throw(500, error);
   }
};


// exports.list = async (ctx) => {
//    try {
//       const posts = await Post.findAll();
//       ctx.body = posts;
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };

// exports.list = async (ctx) => {
//    try {
//       const posts = await Post.findAll({
//          order: [['id', 'DESC']] // id를 기준으로 내림차순 정렬
//       });
//       ctx.body = posts;
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };

// exports.list = async (ctx) => {
//    try {
//       const posts = await Post.findAll({
//          order: [['id', 'DESC']], // id를 기준으로 내림차순 정렬
//          limit: 10 // 가져올 레코드 수 제한
//       });
//       ctx.body = posts;
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };
// exports.list = async (ctx) => {
//    // 쿼리 파라미터로 페이지 번호와 페이지당 레코드 수, 사용자 이름을 받아옵니다.
//    const { page: qpage, limit: qlimit, username } = ctx.query;

//    console.log(`qpage : ${qpage}, qlimit : ${qlimit}, username : ${username}`);

//    const page = parseInt(qpage, 10) || 1; // 기본값은 1
//    const limit = parseInt(qlimit, 10) || 10; // 기본값은 10
//    const offset = (page - 1) * limit;

//    try {
//       // 조건에 따라 쿼리 옵션을 설정합니다.
//       const where = username ? { username } : {};

//       // 페이지네이션과 조인을 적용하여 레코드를 조회합니다.
//       const posts = await Post.findAll({
//          include: [{
//             model: User,
//             where, // username이 주어진 경우 필터링
//             attributes: ['username'] // 결과에 포함할 User 테이블의 컬럼들
//          }],
//          order: [['id', 'ASC']], // id를 기준으로 오름차순 정렬
//          limit, // 페이지당 레코드 수
//          offset // 시작점
//       });

//       // 전체 레코드 수를 조회하여 총 페이지 수를 계산합니다.
//       const totalPosts = await Post.count({
//          include: [{
//             model: User,
//             where
//          }]
//       });
//       const totalPages = Math.ceil(totalPosts / limit);
//       console.log(posts);

//       ctx.body = {
//          posts,
//          pagination: {
//             totalPosts,
//             totalPages,
//             currentPage: page
//          }
//       };
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };

exports.list = async (ctx) => {
   // 쿼리 파라미터로 페이지 번호와 페이지당 레코드 수, 사용자 이름을 받아옵니다.
   const { page: qpage, limit: qlimit, username } = ctx.query;

   const page = parseInt(qpage, 10) || 1; // 기본값은 1
   const limit = parseInt(qlimit, 10) || 5; // 기본값은 5
   const offset = (page - 1) * limit;

   try {
       // 조건에 따라 쿼리 옵션을 설정합니다.
       const where = username ? { username } : {};

       // 페이지네이션과 조인을 적용하여 레코드를 조회합니다.
       const posts = await Post.findAll({
           include: [{
               model: User,
               where, // username이 주어진 경우 필터링
               attributes: ['username'] // 결과에 포함할 User 테이블의 컬럼들
           }],
           order: [['created_date', 'DESC']], // 날짜 순으로
           limit, // 페이지당 레코드 수
           offset // 시작점
       });

       // 전체 레코드 수를 조회하여 총 페이지 수를 계산합니다.
       const totalPosts = await Post.count({
           include: [{
               model: User,
               where
           }]
       });
       const totalPages = Math.ceil(totalPosts / limit);

       // 응답 객체를 원하는 형태로 변환
       const formattedPosts = posts.map(post => ({
           id: post.id,
           title: post.title,
           body: removehtmlAndShorten(post.body),
           user_id: post.user_id,
           created_date: post.created_date,
           username: post.User.username // User 객체에서 username 추출
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
// exports.list = async (ctx) => {
//    // 쿼리 파라미터로 페이지 번호와 페이지당 레코드 수를 받아옵니다.
//    const { page: qpage, limit: qlimit } = ctx.query;

//    console.log(`qpage : ${qpage}, qlimit : ${qlimit}`);

//    const page = parseInt(qpage, 10) || 1; // 기본값은 1
//    const limit = parseInt(qlimit, 10) || 10; // 기본값은 10
//    const offset = (page - 1) * limit;

//    try {
//       // 페이지네이션을 적용하여 레코드를 조회합니다.
//       const posts = await Post.findAll({
//          order: [['id', 'ASC']], // id를 기준으로 내림차순 정렬
//          limit, // 페이지당 레코드 수
//          offset // 시작점
//       });

//       // 전체 레코드 수를 조회하여 총 페이지 수를 계산합니다.
//       const totalPosts = await Post.count();
//       const totalPages = Math.ceil(totalPosts / limit);

//       ctx.body = {
//          posts,
//          pagination: {
//             totalPosts,
//             totalPages,
//             currentPage: page
//          }
//       };
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };


// exports.read = async (ctx) => {
//    console.log("read");
//    const { id } = ctx.params;
//    try {
//       const post = await Post.findOne({ where: { id } });
//       if (!post) {
//          ctx.status = 404;
//          return;
//       }
//       ctx.body = post;
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };

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

// exports.remove = async (ctx) => {
//    const { id } = ctx.params;
//    try {
//       const result = await Post.destroy({ where: { id } });
//       if (!result) {
//          ctx.status = 404;
//          return;
//       }
//       ctx.status = 204; // No Content
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };

// exports.update = async (ctx) => {
//    const { id } = ctx.params;
//    const { title, body } = ctx.request.body;
//    const schema = Joi.object({
//       title: Joi.string(), // 필수 문자열
//       body: Joi.string(), // 필수 문자열
//       user_id: Joi.number().integer(), // 필수 정수
//    });

//   // 검증 후, 검증 실패 시 에러 처리
//    const { error } = schema.validate(ctx.request.body);
//    if (error) {
//       ctx.status = 400; // Bad Request
//       ctx.body = error.details;
//       return;
//    }
//    try {
//       const [updated] = await Post.update({ title, body }, { where: { id } });
//       if (!updated) {
//          ctx.status = 404;
//          return;
//       }
//       const updatedPost = await Post.findOne({ where: { id } });
//       ctx.body = updatedPost;
//    } catch (error) {
//       ctx.throw(500, error);
//    }
// };
