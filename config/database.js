module.exports = {
    configure: function (connection) {
        /*Models*/
        var Account = connection.import('../models/account');
        var AccountHistory = connection.import('../models/account_history');
        var Chatroom = connection.import('../models/chatroom');
        var Item = connection.import('../models/item');
        var Message = connection.import('../models/message');
        var Task = connection.import('../models/task');
        var User = connection.import('../models/user');
        var UserAccount = connection.import('../models/user_account');
        var UserChatroom = connection.import('../models/user_chatroom');

        //Relations
        User.hasMany(Task);
        User.hasMany(Item);
        Account.hasMany(AccountHistory);
        Chatroom.hasMany(Message);
        User.belongsToMany(Account, {through: 'user_account'});
        Account.belongsToMany(User, {through: 'user_account'});
        User.belongsToMany(Chatroom, {through: 'user_chatroom'});
        Chatroom.belongsToMany(User, {through: 'user_chatroom'});

        /*Sync database with those models*/
        console.log('Adding initial scripts to database');

        connection.sync({force:true}).then(function(){
            User.create(
                {
                    username: 'admin',
                    password: 'admin',
                    email: 'admin@mail.com',
                    firstName: 'Stjepan',
                    lastName: 'Ložnjak',
                    address: 'Drežnička cesta 19, Drežnik Podokićki',
                    phoneNumber: '0998863005'
                }).then(function () {
                Item.create(
                    {
                        userId: 1,
                        name: 'Mrkva',
                        date: Date.now(),
                        isDone: 0
                    });
                Task.create(
                    {
                        userId: 1,
                        description: 'Zaljevanje cvijeća',
                        date: '2016-12-12 23:13:32',
                        isDone: 0
                    });
                Task.create(
                    {
                        userId: 1,
                        description: 'Ručak',
                        date: '2016-12-13 14:00:00',
                        isDone: 0
                    });
                Task.create(
                    {
                        userId: 1,
                        description: 'Zadaća',
                        date: '2016-12-13 16:00:00',
                        isDone: 0
                    });
            });

            console.log('Database is up to date!');
        });
    },
    database: 'myhome',
    user: 'myhome',
    password: 'myhome',
    secret: 'yoursecret'
};