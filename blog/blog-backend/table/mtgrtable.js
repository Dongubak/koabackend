const Sequelize = require('sequelize');
const User = require('./users'); // user table 참조
const GcrTable = require('./gcrtable'); // gcrtable 참조

module.exports = class MtgrTable extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            group_id: {
                type: Sequelize.STRING(255),
                allowNull: false,
                references: {
                    model: GcrTable,
                    key: 'group_id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'MtgrTable',
            tableName: 'mtgrtables',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.MtgrTable.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id', as: 'User' });
        db.MtgrTable.belongsTo(db.GcrTable, { foreignKey: 'group_id', targetKey: 'group_id', as: 'Group' });
    }
};