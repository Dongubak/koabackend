const { Op } = require('sequelize');
const { MtgrTable, GcrTable, User, UserCourses, Courses } = require('../../../models'); // 모델 가져오기
const { v4: uuidv4 } = require('uuid'); // UUID 생성 모듈

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

exports.addMeetingGroup = async (ctx) => {
    try {
        // POST 요청의 body에서 uid, groupName, cart를 가져옴
        const { uid, groupName, cart } = ctx.request.body;

        // 1. 고유한 group_id 생성
        const groupId = uuidv4(); // UUID로 고유한 group_id 생성

        // 2. GcrTable에 그룹장 정보와 그룹 이름 추가
        const group = await GcrTable.create({
            group_id: groupId,
            user_id: uid,
            group_name: groupName,
        });

        // 3. MtgrTable에 포함된 유저들의 id 추가
        const memberPromises = cart.map(async (member) => {
            return await MtgrTable.create({
                group_id: groupId,
                user_id: member.id,
            });
        });

        // 모든 사용자 삽입이 완료될 때까지 기다림
        await Promise.all(memberPromises);

        // 응답 설정
        ctx.body = {
            message: "Group and members added successfully",
            group_id: groupId,
            group_name: groupName,
            members: cart,
        };
        ctx.status = 201;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = {
            error: error.message,
        };
    }
};

exports.deleteMeetingGroup = async (ctx) => {
    try {
        // 쿼리 파라미터에서 group_id 가져오기
        const { group_id } = ctx.query;

        // 1. MtgrTable에서 해당 group_id와 관련된 모든 데이터를 삭제
        await MtgrTable.destroy({
            where: {
                group_id,
            },
        });

        // 2. GcrTable에서 해당 group_id의 그룹 정보 삭제
        const deletedGroupCount = await GcrTable.destroy({
            where: {
                group_id,
            },
        });

        // 삭제할 그룹이 없는 경우
        if (deletedGroupCount === 0) {
            ctx.status = 404;
            ctx.body = {
                message: "Group not found",
            };
            return;
        }

        // 응답 설정
        ctx.body = {
            message: "Group and related members deleted successfully",
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

exports.updateMeetingGroup = async (ctx) => {
    try {
        const { group_id, groupName, cart } = ctx.request.body;

        // group_id와 cart 데이터 확인
        if (!group_id || !cart) {
            ctx.status = 400;
            ctx.body = { message: "group_id and cart are required" };
            return;
        }

        // 그룹 이름 업데이트
        await GcrTable.update(
            { group_name: groupName },
            { where: { group_id } }
        );

        // 기존 멤버 삭제
        await MtgrTable.destroy({ where: { group_id } });

        // 새 멤버 추가
        const memberPromises = cart.map((member) => {
            if (!member.user_id) {
                console.log("Invalid member data:", member);
                throw new Error("Each member must have a user_id.");
            }
            return MtgrTable.create({
                group_id,
                user_id: member.user_id, // cart에서 user_id를 사용
            });
        });
        await Promise.all(memberPromises);

        ctx.body = {
            message: "Group updated successfully",
            group_id,
            group_name: groupName,
            members: cart,
        };
        ctx.status = 200;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
};