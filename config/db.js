import pkg from "pg";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  password: "Elly@1342",
  port: 5432,
  database: "SaleForge",
  user: "postgres",
  allowExitOnIdle: true,
  idleTimeoutMillis: 35000,
});
// export default prisma;

export default pool;