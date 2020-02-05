'use strict';

const _ = require('lodash');

module.exports = function (Option) {

    // DO NOT EDIT KEYNAMES AND VALUE
    Option.globalOptions = {
        TRANSACTIONSTATUS: {
            pending: {
                value: 1,
                label: 'Pending',
                sequence: 1
            },
            approved: {
                value: 2,
                label: 'Approved',
                sequence: 2
            },
            rejected: {
                value: 3,
                label: 'Rejected',
                sequence: 3
            }
        },
        ALERTTYPE: {
            notification: {
                value: 1,
                label: 'Notification',
                sequence: 1
            }
        }
    };

    Option.optionsMapForOptionLabelMixin = {};
    for (let identifier in Option.globalOptions) {
        if (!Option.optionsMapForOptionLabelMixin[identifier]) {
            Option.optionsMapForOptionLabelMixin[identifier] = {};
        }
        for (let option in Option.globalOptions[identifier]) {
            Option.optionsMapForOptionLabelMixin[identifier][Option.globalOptions[identifier][option].value] =
                Option.globalOptions[identifier][option].label;
        }
    }

    Option.fetchGlobalOptions = function (callback) {
        return callback(null, Option.globalOptions);
    };

    Option.remoteMethod('fetchGlobalOptions', {
        accepts: [
        ],
        returns: {
            arg: 'data',
            type: 'object',
            root: true
        },
        http: {
            path: '/fetchGlobalOptions',
            verb: 'GET'
        },
        description: 'API for fetching global level option details'
    });

    Option.fetchGlobalOptionsForIdentifier = function (identifier, callback) {
        return callback(null, Option.globalOptions[identifier]);
    };

    Option.getValueByLabel = function (identifier, label) {
        let returnData, found;
        _.each(_.keys(Option.globalOptions[identifier]), function (optionkey) {
            if (Option.globalOptions[identifier][optionkey].label == label) {
                found = optionkey;
            }
        });
        if (found) {
            returnData = Option.globalOptions[identifier][found].value;
        }
        return returnData;
    };

    Option.getLabelByValue = function (identifier, value) {
        let returnData, found;
        _.each(_.keys(Option.globalOptions[identifier]), function (optionkey) {
            if (Option.globalOptions[identifier][optionkey].value == value) {
                found = optionkey;
            }
        });
        if (found) {
            returnData = Option.globalOptions[identifier][found].label;
        }
        return returnData;
    };

    Option.remoteMethod('fetchGlobalOptionsForIdentifier', {
        accepts: [
            {
                arg: 'identifier',
                type: 'string',
                required: true,
                http: {
                    source: 'path'
                }
            }
        ],
        returns: {
            arg: 'data',
            type: 'object',
            root: true
        },
        http: {
            path: '/fetchGlobalOptions/:identifier',
            verb: 'GET'
        },
        description: 'API for fetching global level option details for a particular identifier'
    });

};