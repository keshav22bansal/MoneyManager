const express = require('express');
const router = express.Router();
const User = require('../models/user');
const AppUser = require('../models/appuser');
const moment = require('moment');
var passwordHash = require('password-hash');

function htmlEscape(text) {
    return text.replace(/&/g, '&amp;').
        replace(/</g, '&lt;').  // it's not neccessary to escape >
        replace(/"/g, '&quot;').
        replace(/'/g, '&#039;');
}
// get a list of ninjas from the db
// router.get('/ninjas', function(req, res, next){
//     /* Ninja.find({}).then(function(ninjas){
//         res.send(ninjas);
//     }); */
//     Ninja.geoNear(
//         {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
//         {maxDistance: 100000, spherical: true}
//     ).then(function(ninjas){
//         res.send(ninjas);
//     }).catch(next);
// });

router.get('/users/:ID', function (req, res, next) {
    console.log("God!");
    var USER_ID = req.params["ID"];
    console.log('userid', USER_ID);
    User.findOne({ _id: USER_ID }).then(function (user) {
        console.log('data_user', user);
        res.send({ "data": user.transactions });
    });
});
router.get('/users', function (req, res, next) {
    console.log("God!");

    User.find({}).then(function (users) {
        console.log("value");
        res.send({ "data": users });
    });
});
router.post('/username', function (req, res, next) {
    // console.log('req',req);
    var data = req.body;
    console.log('data', data);

    User.findOne({ username: data.username }).then(function (result) {
        if (result) {
            console.log('result', result);
            res.status(402).send({ success: "false" });
        }
        else {
            User.findByIdAndUpdate({ _id: data.id }, { username: data.username }, { new: true }).then(function (data) {
                console.log('new', data);
                res.send({ "data": data, success: "true" });
            });
        }
    });

});


router.post('/transaction', function (req, res, next) {
    // console.log('req',req);
    var data = req.body;
    console.log('data', data);
    var date = moment().format("MMM Do YY");;
    if (data.othPartyUsername == "" || data.amount == 0) {
        res.status(402).send({ success: "false" });
    }
    User.findOne({ _id: data.payee }).then(function (result) {
        if (!result) {
            console.log('result', result);
            res.status(402).send({ success: "false" });
        }
        else {
            // console.log(result);
            // console.log(result.transactions);

            var arr = result.transactions;
            var new_obj = ({
                username: data.othPartyUsername,
                amount: data.amount * data.sign,
                date: date
            });
            arr.push(new_obj);
            console.log('arr', arr);
            console.log('date#', String(date));
            User.findByIdAndUpdate({ _id: data.payee }, { transactions: arr, date: date }, { new: true }).then(function (final_data) {
                console.log(User.findOne({ username: data.othPartyUsername }));
                User.findOne({ username: data.othPartyUsername }).then(function (otherResult) {
                    var oth_arr = otherResult.transactions;
                    var new_obj = ({
                        username: result.username,
                        amount: -data.amount * data.sign,
                        date: date
                    });
                    oth_arr.push(new_obj);
                    console.log('oth_arr', oth_arr);
                    User.findByIdAndUpdate({ _id: otherResult._id }, { transactions: oth_arr }, { new: true }).then(function (data) {
                        console.log('new', data);
                        res.send({ success: "true" });
                    });
                });
            });


        }
    });

});
// add a new ninja to the db
router.post('/users', function (req, res, next) {
    console.log("Hey!");
    // console.log(req.body);
    // res.send({"method":"post"});
    User.create(req.body).then(function (user) {
        console.log(user);
        res.send(user);
    }).catch(next);
});
///////////////////////////APP/////////////////////
router.post('/app/register', function (req, res, next) {
    // console.log('req',req);
    var data = req.body;
    console.log('data', data);

    AppUser.findOne({ username: htmlEscape(data.username) }).then(function (result) {
        if (result) {
            console.log('result', result);
            res.status(402).send({ success: "false" });
        }
        else {
            new AppUser({
                username: data.username,
                password: passwordHash.generate(data.password),
                transactions: []
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                res.send(newUser);
            });
        }
    });

});

router.post('/app/login', function (req, res, next) {
    var data = req.body;
    console.log('data', data);

    AppUser.findOne({ username: htmlEscape(data.username) }).then(function (result) {
        if (!result) {
            console.log('result', result);
            res.status(402).send({ success: "false" });
        }
        else if (passwordHash.verify(data.password, result.password)) {
            res.status(200).send({ success: "true" });
        } else {
            res.status(402).send({ success: "false" });
        }
    });

});
router.get('/app/users/:ID', function (req, res, next) {
    console.log("God!");
    var USER_ID = req.params["ID"];
    console.log('userid', USER_ID);
    AppUser.findOne({ username: htmlEscape(USER_ID) }).then(function (user) {
        console.log('data_user', user);
        res.send({ "data": user.transactions });
    });
});
router.post('/app/avatar', function (req, res, next) {
    var data = req.body;
    AppUser.findOneAndUpdate({ username: htmlEscape(data.username) }, { avatar: data.avatar }, { new: true }).then(function (user) {
        console.log(user);
        res.send(user);
    });
});
router.get('/app/avatar/:username', function (req, res, next) {
    var username = req.params["username"];
    AppUser.findOne({ username: (username) }).then(function (user) {
        if(!user){
            res.status(402).send({success:"false"})
        }
        else
        res.send({ avatar: user.avatar });
    }).catch();
});
router.post('/app/password', function (req, res, next) {
    var data = req.body;
    AppUser.findOneAndUpdate({ username: htmlEscape(data.username) }, { password: passwordHash.generate(data.password) }, { new: true }).then(function (user) {
        if(user)
        res.send(user);
        else
        res.status(401).send({success:"false"});
    });
});
router.post('/app/transaction/', function (req, res, next) {
    // console.log('req',req);
    var data = req.body;
    console.log('data_transaction ##########', data);
    var date = moment().format("MMM Do YY");
    if (data.other == "" || data.amount == 0) {
        res.status(402).send({ success: "false" });
    }
    AppUser.findOne({ username: htmlEscape(data.username) }).then(function (result) {
        if (!result) {
            console.log('result', result);
            res.status(402).send({ success: "false" });
        }
        else {
            // console.log(result);
            // console.log(result.transactions);

            var arr = result.transactions;
            var new_obj = ({
                username: data.other,
                amount: data.amount * data.sign,
                date: date
            });
            arr.push(new_obj);
            console.log('arr', arr);
            console.log('date#', String(date));
            AppUser.findOneAndUpdate({ username: htmlEscape(data.username) }, { transactions: arr, date: date }, { new: true }).then(function (final_data) {
                console.log(User.findOne({ username: data.other }));
                if (!final_data) {
                    res.status(402).send({ success: "false" });
                }
                else {
                    AppUser.findOne({ username: htmlEscape(data.other) }).then(function (otherResult) {
                        if (!otherResult) {
                            res.status(402).send({ success: "false" });
                        }
                        var oth_arr = otherResult.transactions;
                        var new_obj = ({
                            username: result.username,
                            amount: -data.amount * data.sign,
                            date: date
                        });
                        oth_arr.push(new_obj);
                        console.log('oth_arr', oth_arr);
                        AppUser.findOneAndUpdate({ username: htmlEscape(otherResult.username) }, { transactions: oth_arr }, { new: true }).then(function (data) {
                            console.log('new', data);
                            res.send({ success: "true" });
                        });
                    });
                }
            });


        }
    });

});
// router.post('/ninjas', function(req, res, next){
//     Ninja.create(req.body).then(function(ninja){
//         res.send(ninja);
//     }).catch(next);
// });

// // update a ninja in the db
// router.put('/ninjas/:id', function(req, res, next){
//     Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
//         Ninja.findOne({_id: req.params.id}).then(function(ninja){
//             res.send(ninja);
//         });
//     }).catch(next);
// });

// // delete a ninja from the db
// router.delete('/ninjas/:id', function(req, res, next){
//     Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
//         res.send(ninja);
//     }).catch(next);
// });

module.exports = router;
