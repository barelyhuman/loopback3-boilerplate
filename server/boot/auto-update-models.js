'use strict';

const async = require('async');
const _ = require('lodash');


// // This script does not MIGRATE models, rather UPDATES them. Check loopback docs for difference.
module.exports = function (app, cb) {
    //Strictly for development environment
    if (app.NODE_ENV !== 'development') {
        return cb();
    }

    if (app.NODE_ENV === 'development' && process.argv && process.argv[2] && process.argv[2] === 'skip-migration') {
        return cb();
    }

    let modelsToUpdate = [];
    function updateModel(model, callback) {
        app.models[model].getDataSource().autoupdate()
            .then(data => {
                console.log('Auto updated model ' + model);
                callback();
            }).catch(err => {
                console.log("Error updating Model: ", err);
                callback(err);
            });
    }

    for (var key in app.models) {
        if (app.models[key].getDataSource() &&
            app.models[key].getDataSource().connector) {
            modelsToUpdate.push(key);
        }
    }

    async.eachSeries(modelsToUpdate, updateModel, function (error) {
        if (error) {
            return cb(error);
        } else {
            return cb();
        }
    });

};
