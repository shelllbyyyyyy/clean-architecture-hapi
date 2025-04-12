import { Pool } from "pg";
import config from "../../../common/config";

const pool = new Pool({
  connectionString: config.database.databaseUrl,
});

export default pool;
