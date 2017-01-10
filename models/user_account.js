module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_account', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        accountId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'account',
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'user_account'
    });
};
