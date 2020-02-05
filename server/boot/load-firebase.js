'use strict';

const admin = require("firebase-admin");
const config = require("@server/config");

module.exports = function (app, cb) {
    try {
        const FirebaseAdmin = app.models.FirebaseAdmin;

        const serviceAccount = require(`@server/${config.firebaseAdmin.creds}`);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: config.firebaseAdmin.databaseURL
        });

        FirebaseAdmin.admin = admin;
        return cb();
    } catch (err) {
        console.error(err);
        cb(err);
    }
}