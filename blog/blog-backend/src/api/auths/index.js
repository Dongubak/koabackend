const Router = require('koa-router');
const authCtrl = require('./auths.ctrl');
const authMiddleware = require('../../lib/jwtMiddleware');

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authMiddleware, authCtrl.check);

module.exports = auth;
