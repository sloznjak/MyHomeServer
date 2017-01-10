var config = require('../config/database');
var jwt = require('jwt-simple');
var sequelize = require('sequelize');

var connection = new sequelize('myhome', 'myhome', 'myhome');
var User = connection.import('../models/user');

var functions = {
    authenticate: function(req, res) {
        console.log(req.body);
        User.findOne({where: {username: req.body.username}}).then(function(user){
            if(!user) {
                res.json({success: false, msg: 'Login failed, User not found'});
            }else {
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                         res.json({success: true, token: token, id: user.id});
                    } else {
                        return res.json({success: false, msg: 'Login failed, wrong password.'});
                    }
                });
            }
            
        })
    },
    register: function(req, res){
        console.log(req.body);
        User.findOne({where: {username: req.body.username}}).then(function(user){
            if(user) {
                res.json({success: false, msg: 'Registration failed, username already exists'});
            }else {
                User.create(
                    {
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: req.body.address,
                        phoneNumber: req.body.phoneNumber
                    }).then(function (user) {
                    console.log(user);
                    if (!user){
                        res.json({success:false, msg:'Registration failed'})
                    }
                    else {
                        res.json({success:true, msg:'Registration successfully completed'});
                    }
                });
            }

        });
    },
    getinfo: function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);
            return res.json({success: true, msg: 'hello '+decodedtoken.username});
        }
        else {
            return res.json({success:false, msg: 'No header'});
        }
    }
};

module.exports = functions;
