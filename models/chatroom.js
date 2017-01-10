module.exports = function(sequelize, DataTypes) {
    return sequelize.define('chatroom', {
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
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'chatroom'
    });
};
