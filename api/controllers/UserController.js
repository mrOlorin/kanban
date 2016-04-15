/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 */

module.exports = {
    signup: function (req, res) {
        var Passwords = require('machinepack-passwords');

        Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: 9
        }).exec({
            error: function (err) {
                return res.negotiate(err);
            },
            success: function (encryptedPassword) {
                var email = req.param('email'); 
                User.findOne({
                    email: email
                }, function userFound(err, user) {
                    if (user) {
                        res.conflict(err);
                    } else {
                        User.create({
                            email: email,
                            password: encryptedPassword
                        }, function userCreated(err, newUser) {
                            console.log(err);
                            if (err) {
                                return res.negotiate(err);
                            } else {
                                delete newUser.password;
                                req.session.me = newUser;
                                return res.json(newUser);
                            }
                        });
                    };
                });
            }
        });
    }
};

