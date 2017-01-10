var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'user',
        individualHooks: true,
        instanceMethods: {
            comparePassword : function (passw, cb) {
                bcrypt.compare(passw, this.password, function (err, isMatch) {
                    if (err) {
                        return cb(err);
                    }
                    cb(null, isMatch);
                });
            }
        },
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    });
};

var hashPassword = function(instance, optons, next) {
    var user = instance.dataValues;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
};