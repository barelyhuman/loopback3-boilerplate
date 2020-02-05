'use strict';

const RestError = require('@server/utils/rest-error.js');


module.exports = function (FirebaseAdmin) {

    FirebaseAdmin.socialLogin = async function (socialToken) {
        try {
            const decodedToken = await FirebaseAdmin.admin.auth().verifyIdToken(socialToken);

            const isUserExists = await FirebaseAdmin.app.models.User.findOne({
                where: {
                    email: decodedToken.email
                }
            });

            if (!isUserExists) {

                const userCreation = await FirebaseAdmin.app.models.User.create({
                    email: decodedToken.email,
                    password: decodedToken.uid,
                });

                const created = await FirebaseAdmin.create({
                    userId: userCreation.id
                });

                debugger;


            }


            const response = await FirebaseAdmin.app.models.User.login({
                email: decodedToken.email,
                password: decodedToken.uid
            });

            return response;

        } catch (err) {
            console.error(err);
            return new RestError(500, `Oops! Something went wrong`, String(err));
        }
    }

    FirebaseAdmin.remoteMethod('socialLogin',
        {
            accepts: [
                {
                    arg: 'socialToken',
                    type: 'string',
                    required: 'true',
                    http: {
                        source: 'form'
                    }
                },
            ],
            returns: {
                arg: 'data',
                type: 'object',
                root: true
            },
            http: {
                path: '/socialLogin',
                verb: 'POST'
            },
            description: 'A dummy custom create method'
        });



};


