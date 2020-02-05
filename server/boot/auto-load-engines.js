'use strict';

module.exports = function (app, cb) {
    try {
        app.engines = {};
        return cb();
    } catch (error) {
        console.error(error);
        return cb(error);
    }
};