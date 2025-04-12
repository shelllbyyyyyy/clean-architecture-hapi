import Pkg from "pg";
import config from "../../../common/config.js";

const pool = new Pkg.Pool({
  connectionString: config.database.databaseUrl,
});

export default pool;
