const Sequelize = require('sequelize');
const User = require('../table/users');
const Post = require('../table/posts');
const Comment = require('../table/comments');
const Courses = require('../table/courses');
const UserCourses = require('../table/user_courses');
const MtgrTable = require('../table/mtgrtable'); // mtgrtable 모델 추가
const GcrTable = require('../table/gcrtable'); // gcrtable 모델 추가

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
db.UserCourses = UserCourses;
db.GcrTable = GcrTable; // gcrtable 모델 추가
db.MtgrTable = MtgrTable; // mtgrtable 모델 추가

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Courses.init(sequelize);
UserCourses.init(sequelize);
GcrTable.init(sequelize); // gcrtable 초기화
MtgrTable.init(sequelize); // mtgrtable 초기화


User.associate(db);
Post.associate(db);
Comment.associate(db);
Courses.associate(db);
UserCourses.associate(db);
GcrTable.associate(db); // gcrtable 관계 설정
MtgrTable.associate(db); // mtgrtable 관계 설정


module.exports = db;