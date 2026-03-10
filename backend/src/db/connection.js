import pg from "pg";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Pool } = pg;

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `${__dirname}/../.env` });

const connectionString = ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(`Missing DATABASE_URL for environment: ${ENV}`);
}

const config = { connectionString };

if (ENV === "production") {
  config.max = 2;
}

const db = new Pool(config);

export default db;
