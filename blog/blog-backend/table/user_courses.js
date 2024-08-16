const Sequelize = require('sequelize');

module.exports = class UserCourses extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // 외래 키가 참조하는 테이블
                    key: 'id', // 참조되는 테이블의 키
                },
                onDelete: 'CASCADE', // 사용자가 삭제되면 관련된 user_courses row도 삭제
            },
            course_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'courses', // 외래 키가 참조하는 테이블
                    key: 'id', // 참조되는 테이블의 키
                },
                onDelete: 'CASCADE', // 강의가 삭제되면 관련된 user_courses row도 삭제
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "UserCourses",
            tableName: "user_courses",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
      db.UserCourses.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
      db.UserCourses.belongsTo(db.Courses, { foreignKey: 'course_id', targetKey: 'id', as: 'course' }); // 별칭 'course' 추가
  }
};