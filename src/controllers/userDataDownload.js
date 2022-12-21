const Pool = require("pg").Pool;
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

exports.userDataDownload = async (request, response) => {
  const { id } = request.params;
  console.log(id);

  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`SELECT * FROM trees WHERE user_id=${id}`, (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        const jsonData = JSON.parse(JSON.stringify(res.rows));
        console.log("jsonData", jsonData);
        const json2csvParser = new Json2csvParser({ header: true });
        const csv = json2csvParser.parse(jsonData);
        fs.writeFile("userData.csv", csv, function (error) {
          if (error) throw error;
          console.log("Write to userData.csv is successfully done !!");
        });
      }
    });
  });
};
