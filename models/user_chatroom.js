module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_chatroom', {
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
        chatroomId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'chatroom',
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'user_chatroom'
    });
};
