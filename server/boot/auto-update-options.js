'use strict';

const async = require('async');

module.exports = function (app, cb) {
    const Option = app.models.Option;

    //Strictly for development environment
    if (app.NODE_ENV !== 'development') {
        return cb();
    }

    let optionsToCreate = [];
    for (let identifier in Option.globalOptions) {
        for (let option in Option.globalOptions[identifier]) {
            optionsToCreate.push(new Option({
                identifier: identifier,
                value: Option.globalOptions[identifier][option].value,
                label: Option.globalOptions[identifier][option].label,
                sequence: Option.globalOptions[identifier][option].sequence
            }));
        }
    }

    async.eachSeries(optionsToCreate, function (option, callback) {
        Option.find({
            where: {
                value: option.value,
                identifier: option.identifier
            }
        })
            .then(function (data) {
                if (data && data.length > 1) {
                    return Promise.reject('Multiple entries found for same value and identifier in options table. Please resolve manually');
                } else if (data && data.length == 1) {
                    if (data[0].label != option.label || data[0].sequence != option.sequence) {
                        data[0].label = option.label;
                        data[0].sequence = option.sequence;
                        return data[0].save();
                    } else {
                        return Promise.resolve({});
                    }
                } else {
                    return Option.create(option);
                }
            })
            .then(function () {
                return callback();
            })
            .catch(function (error) {
                return callback(error);
            });
    }, cb);
};