/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 */

module.exports = {
    login: function (req, res) {
        User.findOne({
            email: req.param('email')
        }, function userFound(err, user) {
            if (err) {
                MessageService.error(req, err);
                return res.negotiate(err);
            } else if (!user || 'undefined' === typeof user) {
                return res.notFound();
            }
            var Passwords = require('machinepack-passwords');
            Passwords.checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: user.password
            }).exec({
                error: function (err) {
                    MessageService.error(req, err);
                    return res.negotiate(err);
                },
                incorrect: function () {
                    MessageService.error(req, 'Not found');
                    return res.notFound();
                },
                success: function () {
                    delete user.password;
                    req.session.me = user;
                    return res.ok();
                }
            });
        });
    },
    logout: function (req, res) {
        req.session.destroy();
        res.ok();
    }
};
