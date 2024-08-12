const Router = require('koa-router');
const cartCtrl = require('./cart.ctrl');
const authMiddleware = require('../../lib/jwtMiddleware');

const cart = new Router();

// const printInfo = ctx => {
//    ctx.body = {
//       method: ctx.method,
//       path: ctx.path,
//       params: ctx.params,
//    };
// };
cart.post('/save', cartCtrl.save);
cart.get('/:user_id', authMiddleware, cartCtrl.list);

module.exports = cart;