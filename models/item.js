module.exports = function(sequelize, DataTypes) {
    return sequelize.define('item', {
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
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isDone: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'item'
    });
};
