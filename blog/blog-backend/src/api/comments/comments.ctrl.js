const { Comment } = require('../../../models');
const Joi = require('joi');

// 댓글 생성
exports.create = async (ctx) => {
  const schema = Joi.object({
    post_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    text: Joi.string().required(),
  });

  const { error } = schema.validate(ctx.request.body);
  if (error) {
    ctx.status = 400;
    ctx.body = error.details;
    return;
  }

  const { post_id, user_id, text } = ctx.request.body;

  try {
    const comment = await Comment.create({
      post_id,
      user_id,
      text,
      created_date: new Date(),
    });

    ctx.status = 201;
    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 특정 댓글 조회
exports.read = async (ctx) => {
  const { id } = ctx.params;

  try {
    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
      ctx.status = 404;
      return;
    }

    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 댓글 목록 조회
exports.list = async (ctx) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    per_page: Joi.number().integer().min(1).max(100).default(10),
    post_id: Joi.number().integer().optional(),
  });

  const { error, value } = schema.validate(ctx.query);
  if (error) {
    ctx.status = 400;
    ctx.body = error.details;
    return;
  }

  const { page, per_page, post_id } = value;
  const offset = (page - 1) * per_page;

  try {
    const where = post_id ? { post_id } : {}; // post_id가 있으면 해당 게시물의 댓글만 필터링
    const { count, rows } = await Comment.findAndCountAll({
      where,
      limit: per_page,
      offset,
      order: [['created_date', 'DESC']], // 최신 작성일 기준으로 정렬
    });

    ctx.body = {
      comments: rows,
      page,
      per_page,
      total: count,
      total_pages: Math.ceil(count / per_page),
      postId: post_id
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 댓글 삭제
exports.remove = async (ctx) => {
  const { id } = ctx.params;

  try {
    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
      ctx.status = 404;
      return;
    }

    await comment.destroy();
    ctx.body = {
      comment_id: id
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 댓글 수정
exports.update = async (ctx) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  const { error } = schema.validate(ctx.request.body);
  if (error) {
    ctx.status = 400;
    ctx.body = error.details;
    return;
  }

  const { id } = ctx.params;

  try {
    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
      ctx.status = 404;
      return;
    }

    comment.text = ctx.request.body.text;
    await comment.save();

    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};