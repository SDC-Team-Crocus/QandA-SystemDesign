const { Pool } = require('pg');

const login = {
  user: "",
  host: "localhost",
  database: "qanda",
  password: "",
  port: 5432 //Default psql port
}

const pool = new Pool(login);
pool.connect();

// async function connectionPool() {
//   const pool = new Pool(login);
//   await pool.connect();
//   const now = await pool.query("SELECT NOW()");
//   console.log(`Time: ${now.rows[0]["now"]}`);
//   await pool.end();
//   return now;
// }

// connectionPool();

async function insertUser () {
  const inserted = await pool.query("Insert into Users (UserName, Email) VALUES ($1, $2)", ['Testname5', 'TestingEmail@y.com']);
}