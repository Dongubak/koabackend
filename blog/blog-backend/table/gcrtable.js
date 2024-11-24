const Sequelize = require('sequelize');
const User = require('./users'); // user table 참조

module.exports = class GcrTable extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            group_id: {
                type: Sequelize.STRING(255),
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            group_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'GcrTable',
            tableName: 'gcrtables',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.GcrTable.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    }
};