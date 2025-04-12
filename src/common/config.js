import { config as cfg } from "dotenv";
import path from "path";

if (process.env.NODE_ENV === "test") {
  cfg({
    path: path.resolve(process.cwd(), ".test.env"),
  });
} else {
  cfg();
}

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
    debug: process.env.NODE_ENV === "development" ? { request: ["error"] } : {},
  },
  database: {
    databaseUrl: process.env.DATABASE_URL,
  },
};

export default config;
