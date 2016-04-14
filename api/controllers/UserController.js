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
                User.create({
                    email: req.param('email'),
                    password: encryptedPassword
                }, function userCreated(err, newUser) {
                    if (err) {
                        return res.negotiate(err);
                    } else {
                        delete newUser.password;
                        req.session.me = newUser;
                        return res.json(newUser);
                    }
                });
            }
        });
    }
};

