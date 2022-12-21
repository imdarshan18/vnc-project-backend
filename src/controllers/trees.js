const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
const oneHourLater = new Date();
oneHourLater.setHours(oneHourLater.getHours() - 1);

exports.getAllTrees = async (request, response) => {
  const data = pool.query(`SELECT * FROM trees`, (error, results) => {
    if (error) {
      throw error;
    }
    const rows = results.rows;
    response.status(200).json(rows);
  });
};
