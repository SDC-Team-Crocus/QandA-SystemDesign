const { Pool } = require('pg');

const login = {
  user: "",
  host: "localhost",
  database: "qanda",
  password: "",
  port: 5432 //Default psql port
}

async function connectionPool() {
  const pool = new Pool(login);
  const now = await pool.query("SELECT NOW()");
  await pool.end();
  return now;
}

async function connect() {
  const poolTime = await connectionPool();
  console.log(`Time: ${poolTime.rows[0]["now"]}`);
}

connect();