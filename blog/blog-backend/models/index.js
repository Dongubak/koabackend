const Sequelize = require('sequelize');
const User = require('../table/users');
const Post = require('../table/posts');
const Comment = require('../table/comments');
const Courses = require('../table/courses');
const UserCourses = require('../table/user_courses'); // user_courses 모델 추가

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  logging: console.log // 로그 추가
});

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Courses = Courses;
db.UserCourses = UserCourses; // user_courses 모델 추가

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Courses.init(sequelize);
UserCourses.init(sequelize); // user_courses 초기화

User.associate(db);
Post.associate(db);
Comment.associate(db);
Courses.associate(db);
UserCourses.associate(db); // user_courses 관계 설정

module.exports = db;