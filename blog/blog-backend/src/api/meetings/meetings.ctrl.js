const { Op } = require('sequelize');
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
       // 쿼리 파라미터에서 group_id와 user_id 가져오기
       const { group_id, user_id } = ctx.query;

       // 해당 group_id의 소유자가 현재 user_id와 같은지 확인
       const group = await GcrTable.findOne({
           where: { group_id },
           attributes: ['user_id'],
       });

       // 그룹이 존재하지 않으면 에러 반환
       if (!group) {
           ctx.status = 404;
           ctx.body = { message: "Group not found" };
           return;
       }

       // isOwner 여부 확인
       const isOwner = group.user_id === parseInt(user_id);

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
               isOwner,
           };
           ctx.status = 200;
           return;
       }

       // 각 유저에 대해 저장된 강의 정보 가져오기
       const userCoursesPromises = usersInGroup.map(async (member) => {
           const userCourses = await UserCourses.findAll({
               where: { user_id: member.User.id },
               include: [
                   {
                       model: Courses,
                       as: 'Course',
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
           isOwner, // isOwner 추가
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

exports.searchUsername = async (ctx) => {
    try {
        const { keyword } = ctx.query;
        console.log(keyword);

        // `User` 테이블에서 `username`이 keyword를 포함하는 사용자 검색
        const users = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${keyword}%`
                }
            },
            attributes: ['id', 'username'],
            include: [
                {
                    model: UserCourses,
                    as: 'UserCourses', // User와 UserCourses 간의 별칭
                    include: [
                        {
                            model: Courses,
                            as: 'Course', // UserCourses와 Courses 간의 별칭
                            attributes: ['course_name', 'professor', 'credits', 'class_time']
                        }
                    ]
                }
            ]
        });

        // 검색된 사용자와 그 사용자가 저장한 강의 정보를 배열로 변환
        const userList = users.map(user => {
            const courses = user.UserCourses.map(userCourse => userCourse.Course);
            return {
                username: user.username,
                id: user.id,
                courses
            };
        });

        // 응답 설정
        ctx.body = {
            userDatas: userList
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




// `${apiURL}/api/meeting/searchUsername`,