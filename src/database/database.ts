import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_ROOT_PASSWORD || "example",
  database: process.env.DB_NAME || "bootcamp_desafio",
  connectionLimit: 5,
  allowPublicKeyRetrieval: true,
});

export async function getConnection() {
  return await pool.getConnection();
}

export async function query(sql: string, params?: any[]) {
  let conn;
  try {
    conn = await getConnection();
    return await conn.query(sql, params);
  } finally {
    if (conn) conn.release();
  }
}

export default pool;
