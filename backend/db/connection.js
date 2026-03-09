const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../.env` });

const connectionString = ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(`Missing DATABASE_URL for environment: ${ENV}`);
}

const config = { connectionString };

if (ENV === "production") {
  config.max = 2;
}

const db = new Pool(config);

module.exports = db;
