var express = require('express');
var actions = require('../methods/actions');
var request = require('request');

var router = express.Router();

router.post('/authenticate', actions.authenticate);
router.post('/register', actions.register);
router.get('/getinfo', actions.getinfo);

router.get('/arduino', function (req, res) {
    request('http://192.168.1.101/?ArduinoPIN4=on', function (error, response, body) {
        res.send(body);
    })
});

router.get('/RGB/r:red/g:green/b:blue', function (req, res) {
    console.log(req.params);
    var url = 'http://192.168.1.101/RGB/r' + req.params.red + '/g' + req.params.green + '/b' + req.params.blue + '/';
    console.log(url);
    request(url, function (error, response, body) {
        console.log("---------------------------------------");
        console.log(response);
        console.log("---------------------------------------");
        console.log(body);
        console.log("---------------------------------------");
        res.send(body);
    })
});

module.exports = router;