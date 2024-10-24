const { MtgrTable, GcrTable, User, UserCourses, Courses } = require('../../../models'); // 모델 가져오기

exports.init = async (ctx) => {
    try {
        // 쿼리 파라미터에서 user_id 가져오기
        const { user_id } = ctx.query;

        // 해당 user_id가 포함된 group_id를 모두 조회
        const meetings = await MtgrTable.findAll({
            where: {
                user_id
            },
            attributes: ['group_id'], // group_id만 가져오기
        });

        // group_id 리스트를 배열로 변환
        const groupIds = meetings.map(meeting => meeting.group_id);

        // gcrtable에서 group_id와 group_name 조회
        const groups = await GcrTable.findAll({
            where: {
                group_id: groupIds
            },
            attributes: ['group_id', 'group_name'], // group_id와 group_name 가져오기
        });

        // 조회된 결과를 리스트로 변환
        const groupList = groups.map(group => ({
            group_id: group.group_id,
            group_name: group.group_name
        }));

        // 응답 설정
        ctx.body = {
            message: "success",
            groups: groupList
        };

        ctx.status = 200;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = {
            error: error.message,
        };
    }
};

exports.listGroupTimeTable = async (ctx) => {
   try {
       // 쿼리 파라미터에서 group_id 가져오기
       const { group_id } = ctx.query;

       // 그룹에 속한 유저들의 정보 가져오기
       const usersInGroup = await MtgrTable.findAll({
           where: { group_id },
           include: [
               {
                   model: User,
                   as: 'User', // associate에서 설정한 별칭 'User' 사용
                   attributes: ['id', 'username'],
               },
           ],
       });

       // 그룹에 속한 유저가 없을 경우 빈 배열 반환
       if (!usersInGroup.length) {
           ctx.body = {
               message: "success",
               groupMembers: [],
           };
           ctx.status = 200;
           return;
       }

       // 각 유저에 대해 저장된 강의 정보 가져오기
       const userCoursesPromises = usersInGroup.map(async (member) => {
           const userCourses = await UserCourses.findAll({
               where: { user_id: member.User.id }, // 수정된 코드: 별칭에 맞게 수정
               include: [
                   {
                       model: Courses,
                       as: 'Course', // associate에서 설정한 별칭 'Course' 사용
                       attributes: ['course_name', 'professor', 'credits', 'class_time'],
                   },
               ],
           });

           // 강의 정보 추출 및 배열로 변환
           const courses = userCourses.map((userCourse) => userCourse.Course);

           return {
               user_id: member.User.id,
               username: member.User.username,
               courses,
           };
       });

       // 모든 유저에 대한 강의 정보를 비동기적으로 가져옴
       const groupsTimetable = await Promise.all(userCoursesPromises);

       // 응답 설정
       ctx.body = {
           message: "success",
           groupsTimetable,
       };

       ctx.status = 200;
   } catch (error) {
       console.error(error);
       ctx.status = 500;
       ctx.body = {
           error: error.message,
       };
   }
};