'use strict';

const RestError = require('../utils/rest-error.js');

module.exports = function (Model, options) {
    // Model.afterRemoteError('**', function (ctx, next) {
    //   if (ctx.error && ctx.error instanceof RestError) {
    //     return next();
    //   } else if (ctx.error && !(ctx.error instanceof RestError)) {
    //     console.error(ctx.error);
    //     return next(new RestError(400, 'Oops! Something went wrong!'));
    //   } else {
    //     return next();
    //   }
    // });
};
