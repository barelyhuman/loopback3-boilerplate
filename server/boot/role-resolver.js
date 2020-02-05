'use strict';

const RestError = require('../utils/rest-error');

module.exports = function (app, cb) {
    const Role = app.models.Role;

    Role.registerResolver('$unauthenticated', function (role, context, next) {
        if (!context.remotingContext.req.currentAppUser || !context.remotingContext.req.currentAppUser.id) {
            return next(null, true);
        } else {
            return next(null, false);
        }
    });

    Role.registerResolver('$authenticated', function (role, context, next) {
        if (context.remotingContext.req.accessToken) {
            context.remotingContext.req.accessToken.validate((err) => {
                if (err) {
                    return next(null, false)
                }

                return next(null, true);
            });
            // return next(null, true);
        } else {
            return next(new RestError(401, `ACCESS Blocked!`), false);
        }
    });

    Role.registerResolver('$everyone', function (role, context, next) {
        return next(null, true);
    });

    cb();

};
