
var express = require('express');
var router = express.Router();
var User = require('../models/db_users');

router.post('/register', function (req, res, next) {

    var newUser = new User({
        user_name: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add a new user.'
            });
        } else {
            res.json({
                success: true,
                msg: 'New user now registered.'
            });
        }
    })

});

router.post('/authenticate', function (req, res, next) {

    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found.'
            });
        }
    
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {

                var token = jwt.sign(user, app.get('superSecret'), {
                  expiresInMinutes: 1440 // expires in 24 hours
                });

                res.json({
                    success: true,
                    user: {
                        id: user._id,
                        username: user.user_name,
                        msg: 'User logged in.'
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Wrong password.'
                });

            }
        })
    })
});

router.post('/exists', function (req, res, next) {
    const username = req.body.username;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user) {
            return res.json({
                success: true
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
});

// router.get('/profile', (req, res, next) => {
//     // if(!req.cookies.auth || req.cookies.auth.active != true)
//     // {
//     //     // make sure the cookie is empty.
//     //     res.clearCookie('auth');

//     //     // send message or redirect.
//     //     return res.json({msg:'No user logged on.'});
//     //     //return res.redirect('/');
//     // }
//     // res.json({
//     //     user: req.cookies.auth
//     // });    
// })

// export this router
module.exports = router;