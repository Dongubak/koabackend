const Joi = require('joi');
const { UserCourses, Courses } = require('../../../models'); // Sequelize models

exports.list = async (ctx) => {
   const { user_id } = ctx.params; // user_id는 이미 미들웨어에서 검증되었음
   console.log('list', user_id);
   try {
      // user_id로 저장된 모든 강의 정보를 조회
      const userCourses = await UserCourses.findAll({
         where: { user_id },
         include: [
            {
               model: Courses,
               as: 'Course',
               attributes: ['id', 'course_name', 'professor', 'class_time', 'class_location1'], // 필요한 강의 필드만 포함
            },
         ],
      });

      // 강의 정보만 추출하여 배열로 변환
      const courses = userCourses.map(uc => uc.Course);

      ctx.status = 200; // OK
      ctx.body = {
         message: 'Courses retrieved successfully.',
         data: courses,
      };
   } catch (error) {
      console.error(error);
      ctx.status = 500; // Internal Server Error
      ctx.body = {
         message: 'An error occurred while retrieving the courses.',
         error: error.message,
      };
   }
};

exports.save = async (ctx) => {
   console.log(ctx.request.body);
   const { user_id, course_ids } = ctx.request.body; // Expecting an array of course IDs

   console.log(user_id, course_ids);

   const schema = Joi.object({
      user_id: Joi.number().integer().required(), // Required integer
      course_ids: Joi.array().items(Joi.number().integer()).required(), // Allow empty arrays or arrays of integers
   });

   // Validate the input
   const { error } = schema.validate(ctx.request.body);
   if (error) {
      ctx.status = 400; // Bad Request
      ctx.body = error.details;
      return;
   }

   try {
      // If course_ids is an empty array, delete all courses for the user and return
      if (course_ids.length === 0) {
         // Remove any existing courses for this user
         await UserCourses.destroy({
            where: { user_id },
         });

         ctx.status = 200; // OK
         ctx.body = {
            message: 'All courses successfully removed for the user.',
            data: [], // Return an empty array as there are no courses left
         };
         return;
      }

      // First, remove any existing courses for this user
      await UserCourses.destroy({
         where: { user_id },
      });

      // Prepare bulk insert data
      const userCoursesData = course_ids.map(course_id => ({
         user_id,
         course_id,
      }));

      // Bulk insert the new courses
      await UserCourses.bulkCreate(userCoursesData);

      // Fetch all courses for the user after insertion
      const userCourses = await UserCourses.findAll({
         where: { user_id },
         include: [
            {
               model: Courses,
               as: 'Course',
               attributes: ['id', 'course_name', 'professor', 'class_time', 'class_location1', 'class_location2'], // Select relevant fields
            },
         ],
      });

      // Map the results to return the course information
      const courses = userCourses.map((uc) => uc.Course);

      ctx.status = 201; // Created
      ctx.body = {
         message: 'Courses successfully saved to the user.',
         data: courses,
      };
   } catch (error) {
      console.error(error);
      ctx.status = 500; // Internal Server Error
      ctx.body = {
         message: 'An error occurred while saving the courses.',
         error: error.message,
      };
   }
};