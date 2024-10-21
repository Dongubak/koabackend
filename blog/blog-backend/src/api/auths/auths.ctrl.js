const Joi = require('joi');
const { User } = require('../../../models');
require('dotenv').config(); // 환경 변수 로드

exports.register = async (ctx) => {
    // 요청 데이터 검증
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    const { error, value } = schema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400; // Bad Request
        ctx.body = error.details;
        return;
    }

    const { username, password } = value;

    try {
        // 이미 존재하는 사용자 검사
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            ctx.status = 409; // Conflict
            ctx.body = { message: 'Username already exists' };
            return;
        }

        // 새로운 사용자 생성
        const user = await User.create({ username, password });
        const token = User.generateToken(user);

        ctx.status = 201; // Created

        ctx.body = { 
            message: 'Login successful',
            user: {
                message: 'User registered successfully',
                id: user.dataValues.id,
                username: user.dataValues.username,
                token
            }
        };

    } catch (error) {
        ctx.throw(500, error);
    }
};

exports.login = async (ctx) => {
    // 요청 데이터 검증
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    const { error, value } = schema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400; // Bad Request
        ctx.body = error.details;
        return;
    }

    const { username, password } = value;

    try {
        // 사용자 조회
        const user = await User.findByUsername(username);

        if (!user) {
            ctx.status = 401; // Unauthorized
            ctx.body = { message: 'Invalid username' };
            return;
        }
        
        // 비밀번호 검증
        const validPassword = await User.comparePassword(password, user.password);
        if (!validPassword) {
            ctx.status = 402; // invalid password
            ctx.body = { message: 'Invalid password' };
            return;
        }

        const token = User.generateToken(user);
        ctx.body = { message: 'Login successful',
        user: {
            id: user.dataValues.id,
            username: user.dataValues.username,
            token
        }};
    } catch (error) {
        ctx.throw(500, error);
    }
};

exports.logout = async (ctx) => {
    ctx.body = { message: 'Logout successful' };
};

exports.check = async (ctx) => {
    const token = ctx.headers.authorization.split(' ')[1];
    const decoded = User.verifyToken(token);
    if (!decoded) {
        ctx.status = 401; // Unauthorized
        ctx.body = { message: 'Invalid token' };
        return;
    }

    const remainingTime = User.getRemainingTime(token);
    let newToken = null;

    if (remainingTime && remainingTime < 60 * 10) { // 10분 미만 남은 경우
        const user = await User.findByPk(decoded.id);
        newToken = User.generateToken(user);
    }

    console.log("checking")

    ctx.body = {
        message: 'Token is valid',
        user: {
            id : decoded.id,
            username : decoded.username,
            token : newToken ? newToken : token
        }
    };
};
