'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const loopbackConsole = require('loopback-console');

const app = module.exports = loopback();
app.NODE_ENV = process.env.NODE_ENV || 'development';
app.APP_TYPE = 'worker';
process.mainServerDirectory = '' + __dirname;
app.globalConfig = require(`./global-config.${app.NODE_ENV}.json`);

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) {
        throw err;
    }

    // start the worker if `$ node worker.js`
    if (loopbackConsole.activated()) {
        loopbackConsole.start(app, {
            prompt: 'Wealthfy worker # ',
            // Other REPL or loopback-console config
        }, function (err, ctx) {
            // Perform post-boot operations here.
            // The 'ctx' handle contains the console context, including the following
            // properties: app, lbContext, handles, models
        });
    } else if (require.main === module) {

        // TODO: Add queue Listener


    }
});
