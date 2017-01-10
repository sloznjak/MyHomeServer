module.exports = function(sequelize, DataTypes) {
    return sequelize.define('account_history', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        accountId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'account',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        transaction: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'account_history'
    });
};
