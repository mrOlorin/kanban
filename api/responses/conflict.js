/**
 * 409 (Conflict) Handler
 *
 * Usage:
 * return res.exists();
 * return res.exists(err);
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

module.exports = function exists(data, options) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(409);

    // Log error to console
    if (data !== undefined) {
        sails.log.verbose('Sending 409 ("Conflict") response: \n', data);
    } else
        sails.log.verbose('Sending 409 ("Conflict") response');

    // Only include errors in response if application environment
    // is not set to 'production'.  In production, we shouldn't
    // send back any identifying information about errors.
    if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
        data = undefined;
    }

    return res.jsonx(data);
};

