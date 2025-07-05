"use strict";
// knexfile.ts (CommonJS style)
require("dotenv").config();
/** @type {import('knex').Knex.Config} */
const config = {
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
        directory: "./src/migrations",
        extension: "ts",
    },
    seeds: {
        directory: "./src/seeds",
        extension: "ts",
    },
};
module.exports = config;
