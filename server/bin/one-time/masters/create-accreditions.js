'use strict';

const app = require('../../../server.js');


const institutes = [];

async function main() {

    const creationPromises = institutes.map(record => {
        return app.models.Institutes.upsert(record);
    });

    try {
        await Promise.all(creationPromises);
        console.log('Records Inserted successfully!');
        process.exit(0);
    } catch (err) {
        console.error(error);
        process.exit(1);
    }


}