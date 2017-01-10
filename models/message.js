module.exports = function(sequelize, DataTypes) {
    return sequelize.define('message', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        chatroomId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'chatroom',
                key: 'id'
            }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'message'
    });
};
