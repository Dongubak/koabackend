const { User } = require('../../models');

const authMiddleware = async (ctx, next) => {
    const token = ctx.headers.authorization && ctx.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
        ctx.status = 401; // Unauthorized
        ctx.body = { message: 'No token provided' };
        return;
    }

    const decoded = User.verifyToken(token);

    if (!decoded) {
        ctx.status = 401; // Unauthorized
        ctx.body = { message: 'Invalid token' };
        return;
    }

    ctx.state.user = decoded; // 토큰이 유효하면 사용자 정보를 ctx.state에 저장
    // console.log('Decoded user:', decoded); // 디버깅 로그 추가
    await next();
};

module.exports = authMiddleware;
