const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("test.csv");

exports.dbToCsv = () => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query("SELECT * FROM trees", (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        const jsonData = JSON.parse(JSON.stringify(res.rows));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function () {
            console.log("Write to test.csv successfully!");
          })

          .pipe(ws);
      }
    });
  });
};
