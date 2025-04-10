const { Pool } = require("pg");
const config = require("../../../common/config");

const pool = new Pool({
  connectionString: config.database.databaseUrl,
});

module.exports = pool;
