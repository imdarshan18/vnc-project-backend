var express = require("express");
var router = express.Router();
const treeController = require("../controllers/trees");
const dbToCSV = require("../services/dbToCSV");
const xlsxtoDB = require("../services/xlToCsv");
const csvData = require("../controllers/userDataDownload");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/trees", treeController.getAllTrees);
router.get("/csv", dbToCSV.dbToCsv);
router.get("/xlsx", xlsxtoDB.xlToCSV);
router.get("/csv-download/:id", csvData.userDataDownload);

module.exports = router;
