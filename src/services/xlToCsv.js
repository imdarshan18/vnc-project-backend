const fs = require("fs");
const fastcsv = require("fast-csv");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

exports.xlToCSV = async (req, res) => {
  XLSX = require("xlsx");

  const workBook = await XLSX.readFile("test.xlsx");
  XLSX.writeFile(workBook, "testCSV.csv", { bookType: "csv" });

  let stream = fs.createReadStream("testCSV.csv");
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      // connect to the PostgreSQL database
      // save csvData
      const query =
        "INSERT INTO trees (user_id, tree_name, longitude, latitude, description, tree_id) VALUES ($1, $2, $3, $4, $5, $6)";

      pool.connect((err, client, done) => {
        if (err) throw err;

        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) throw err;
              else {
                console.log("inserted" + res.rowCount + "row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });
  stream.pipe(csvStream);

  //   const query =
  //     "INSERT INTO trees (id, tree_name, longitude, latitude, description) VALUES ($1, $2, $3, $4, $5)";
  //   pool.connect((err, client, done) => {
  //     if (err) throw err;
  //     try {
  //       workBook.forEach((row) => {
  //         client.query(query, row, (err, res) => {
  //           if (err) {
  //             console.log(err.stack);
  //           } else {
  //             console.log("inserted " + res.rowCount + " row:", row);
  //           }
  //         });
  //       });
  //     } finally {
  //       done();
  //     }
  //   });
};
