const Sequelize = require('sequelize');
const User = require('../table/users');
const Post = require('../table/posts');
const Comment = require('../table/comments');
const Courses = require('../table/courses');


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

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Courses.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Courses.associate(db);

module.exports = db;
