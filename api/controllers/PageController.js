/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 */

module.exports = {
    showHomePage: function (req, res) {
        if (!req.session.me) {
            // Guest request
            return res.view('homepage');
        }

        User.findOne(req.session.me.id, function (err, user) {
            if (err) {
                return res.negotiate(err);
            }

            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.view('homepage');
            }

            return res.view('kanban');
        });
    }
};

