module.exports = function(sequelize, DataTypes) {
    return sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'account'
    });
};
