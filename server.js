var express = require('express');
    cors = require('cors');
    morgan = require('morgan');
    database = require('./config/database');
    passport = require('passport');
    routes = require('./routes/routes');
    bodyparser = require('body-parser');
    epilogue = require('epilogue');
    sequelize = require('sequelize');



//config database
var connection = new sequelize('myhome', 'myhome', 'myhome');
database.configure(connection);

var Account = connection.import('./models/account');
var AccountHistory = connection.import('./models/account_history');
var UserAccount = connection.import('./models/user_account');
var Item = connection.import('./models/item');
var Task = connection.import('./models/task');
var User = connection.import('./models/user');

var app = express();
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());
    app.use(routes);
    app.use(passport.initialize());
    require('./config/passport')(passport);

// Initialize epilogue
epilogue.initialize({
    app: app,
    sequelize: connection
});

var accountResource = epilogue.resource({
    model: Account,
    endpoints: ['/api/accounts', '/api/account/:id'],
    associations: true
});

var itemResource = epilogue.resource({
    model: Item,
    endpoints: ['/api/items', '/api/item/:id']
});

var taskResource = epilogue.resource({
    model: Task,
    endpoints: ['/api/tasks', '/api/task/:id']
});

var userResource = epilogue.resource({
    model: User,
    endpoints: ['/api/users', '/api/user/:id']
});

var userAccountResource = epilogue.resource({
    model: UserAccount,
    endpoints: ['/api/userAccounts', '/api/userAccount/:id'],
    associations: true
});

var accountHistoryResource = epilogue.resource({
    model: AccountHistory,
    endpoints: ['/api/accountHistories', '/api/accountHistory/:id'],
    associations: true
});




var server = app.listen(8000, function() {
    console.log('Server listening on port ' + server.address().port);
});

