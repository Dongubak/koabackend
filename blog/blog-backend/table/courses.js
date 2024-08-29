const Sequelize = require('sequelize');

module.exports = class Courses extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            day_night: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            department: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            course_type: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            grade: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            course_number: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            course_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            credits: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            professor: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            class_time: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            class_type: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            location1: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            location2: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "Course",
            tableName: "Courses",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }

    static associate(db) {
        // 강의가 여러 사용자가 선택할 수 있도록 user_courses와의 관계를 정의
        db.Courses.hasMany(db.UserCourses, { foreignKey: 'course_id', sourceKey: 'id' });
    }

    // 교수 이름에서 키워드로 검색
    static async findByProfessorKeyword(keyword, { limit, offset }) {
      // 키워드에서 불필요한 따옴표를 제거
      const sanitizedKeyword = keyword.replace(/['"]/g, '');
  
      return await this.findAll({
          where: {
              professor: {
                  [Sequelize.Op.like]: `%${sanitizedKeyword}%`
              }
          },
          limit,
          offset,
      });
  }

    // 강의 이름에서 키워드로 검색
    static async findByCourseNameKeyword(keyword, { limit, offset }) {
         const sanitizedKeyword = keyword.replace(/['"]/g, '');
        return await this.findAll({
            where: {
                course_name: {
                    [Sequelize.Op.like]: `%${sanitizedKeyword}%`
                }
            },
            limit,
            offset,
        });
    }
};