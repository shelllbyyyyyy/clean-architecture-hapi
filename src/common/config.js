const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".test.env"),
  });
} else {
  dotenv.config();
}

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  database: {
    databaseUrl: process.env.DATABASE_URL,
  },
};

module.exports = config;
