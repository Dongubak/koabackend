const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE',
            },
            created_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "Post",
            tableName: "posts",
            paranoid: false,
            charset: "utf8",
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
        db.Post.hasMany(db.Comment, { foreignKey: 'post_id', sourceKey: 'id' });
    }
}
