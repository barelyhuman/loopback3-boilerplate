'use strict';

const RestError = require('../../server/utils/rest-error');

module.exports = function (Dummy) {

    Dummy.customCreateMethod = async function (name, age, birthDate) {
        try {

            const creation = await Dummy.create({ name, age, birthDate });
            if (creation) {
                return {
                    success: true,
                    message: "Created New dummy"
                }
            }
        } catch (err) {
            return Promise.reject(new RestError(500, err));
        }
    };


    Dummy.remoteMethod('customCreateMethod', {
        accepts: [
            {
                arg: 'name',
                type: 'string',
                http: {
                    source: 'form'
                }
            },
            {
                arg: 'age',
                type: 'number',
                http: {
                    source: 'form'
                }
            },
            {
                arg: 'birthDate',
                type: 'date',
                http: {
                    source: 'form'
                }
            }
        ],
        returns: {
            arg: 'data',
            type: 'object',
            root: true
        },
        http: {
            path: '/customCreateMethod',
            verb: 'POST'
        },
        description: 'A dummy custom create method'
    });

};
