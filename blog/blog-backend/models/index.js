const Sequelize = require('sequelize');
const User = require('../table/users');
const Post = require('../table/posts');
const Comment = require('../table/comments');


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

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);

module.exports = db;
