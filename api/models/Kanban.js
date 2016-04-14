/**
 * Kanban.js
 *
 * @description :: Kanban model.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    attributes: {
        kanban: {
            type: 'object',
            required: true
        },
        owner: {
            model: 'user'
        }
    }
};
