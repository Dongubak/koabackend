const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'posts',
                    key: 'id'
                },
                onDelete: 'CASCADE',
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
            text: {
                type: Sequelize.TEXT,
                allowNull: false,
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
            modelName: "Comment",
            tableName: "comments",
            paranoid: false,
            charset: "utf8",
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
        db.Comment.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
    }
}
