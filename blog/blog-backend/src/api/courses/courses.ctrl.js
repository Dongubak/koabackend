const { Courses } = require('../../../models');
const { Op } = require('sequelize');

exports.list = async (ctx) => {
    // 쿼리 파라미터로 페이지 번호, 페이지당 레코드 수, 교수 이름, 강의 이름을 받아옵니다.
    const { page: qpage, limit: qlimit, professor, course_name } = ctx.query;

    const page = parseInt(qpage, 10) || 1; // 기본값은 1
    const limit = parseInt(qlimit, 10) || 10; // 기본값은 10
    const offset = (page - 1) * limit;

    try {
        let courses;
        let totalCourses;

        // 교수 이름이 제공된 경우
        if (professor) {
            const sanitizedProfessor = professor.replace(/['"]/g, '');
            courses = await Courses.findByProfessorKeyword(professor, { limit, offset });
            totalCourses = await Courses.count({
                where: {
                    professor: {
                        [Op.like]: `%${sanitizedProfessor}%`
                    }
                }
            });
        }
        // 강의 이름이 제공된 경우
        else if (course_name) {
            const sanitizedCourse_name = course_name.replace(/['"]/g, '');
            courses = await Courses.findByCourseNameKeyword(course_name, { limit, offset });
            totalCourses = await Courses.count({
                where: {
                    course_name: {
                        [Op.like]: `%${sanitizedCourse_name}%`
                    }
                }
            });
        }
        // 조건이 제공되지 않은 경우
        else {
            ctx.status = 400;
            ctx.body = {
                message: 'Either professor or course_name query parameter must be provided.'
            };
            return;
        }

        const totalPages = Math.ceil(totalCourses / limit);

        ctx.body = {
            courses,
            pagination: {
                totalCourses,
                totalPages,
                currentPage: page
            }
        };
    } catch (error) {
        ctx.throw(500, error);
    }
};