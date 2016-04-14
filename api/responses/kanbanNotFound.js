/**
 * Kanban 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(kanban);
 *
 * e.g.:
 * ```
 * return res.kanbanNotFound();
 * ```
 */
module.exports = function kanbanNotFound(kanban) {

    var res = this.res;
    kanban = kanban ? kanban : {};
    return res.notFound(kanban);

};

