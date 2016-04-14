/**
 * KanbanController
 *
 * @description :: Server-side logic for managing kanbans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        var userId = req.param('userId');
        // Find user by id
        User.findOne({id: userId}).exec(function userFound(err, user) {
            if (err || !user) {
                MessageService.error(req, err);
                return res.negotiate(err);
            } else {
                // Look for user's kanban or create one
                Kanban.findOrCreate(
                        {owner: user.id},
                        {owner: user.id, kanban: KanbanService.getInitialKanban()}
                ).exec(function kanbanFound(err, kanban) {
                    if (err || !kanban) {
                        MessageService.error(req, err);
                        return res.negotiate(err);
                    } else {
                        // Those are templates by which user may add new items in his kanban.
                        kanban.templates = KanbanService.getTemplates();
                        return res.ok(kanban);
                    }
                });
            }
        });
    },
    post: function (req, res) {
        var userId = req.param('userId');
        // Find user by id
        User.findOne({id: userId}).exec(function userFound(err, user) {
            // Find user's kanban
            Kanban.findOne(
                    {owner: user.id}
            ).exec(function kanbanFound(err, kanban) {
                if (err) {
                    return res.negotiate(err);
                } else if (!kanban) {
                    // If kanban was not found, create it
                    Kanban.create(
                            {owner: user.id, kanban: req.param('kanban')}
                    ).exec(function kanbanCreated(err, kanban) {
                        if (err) {
                            MessageService.error(req, err);
                            return res.negotiate(err);
                        } else {
                            MessageService.success(req, 'Created');
                            return res.ok({kanban: kanban});
                        }
                    });
                } else {
                    Kanban.update(
                            {owner: user.id}, {kanban: req.param('kanban')}
                    ).exec(function kanbanCreated(err, kanban) {
                        if (err) {
                            MessageService.error(req, err);
                            return res.negotiate(err);
                        } else {
                            MessageService.success(req, 'Updated');
                            return res.ok({kanban: kanban});
                        }
                    });
                }
            });
        });
    },
    put: function (req, res) {
        // As far as i understand, angular's $resource doesn't have 
        // an implementation for the PUT request, so i use POST instead.
    }
};

