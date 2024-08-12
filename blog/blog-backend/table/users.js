const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // 환경 변수 로드

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: 'utf8_general_ci',
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                }
            }
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post, { foreignKey: 'user_id', sourceKey: 'id' });
        db.User.hasMany(db.Comment, { foreignKey: 'user_id', sourceKey: 'id' });
        db.User.hasMany(db.UserCourses, { foreignKey: 'user_id', sourceKey: 'id' }); // user_courses와의 1:N 관계 정의
    }

    static async comparePassword(inputPassword, hashedPassword) {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }

    static async findByUsername(username) {
        return await this.findOne({ where: { username } });
    }

    static generateToken(user) {
        const payload = {
            id: user.id,
            username: user.username,
        };
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null;
        }
    }

    static getRemainingTime(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp - currentTime;
        } catch (error) {
            return null;
        }
    }
}
