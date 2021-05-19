var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const app = express()
app.use(
  express.urlencoded({
    extended: true,
  })
);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bitchlasagna",
  database: "Demo",
});
connection.connect();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/select", function (req, res, next) {
  connection.query(
    'select name from user where email="' + req.query.email + '";',
    (error, results, fields) => {
      if (error) {
        res.writeHead(500);
        res.end("couldn't insert");
      } else {
        res.writeHead(200);
        if (results.length > 0) {
          res.end(results[0].name);
        } else {
          res.end("absent");
        }
      }
    }
  );
});

router.post("/", function (req, res, next) {
  connection.query(
    'insert into user (email,name) values ("' +
      req.body.email +
      '","' +
      req.body.name +
      '");',
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.writeHead(500);
        res.end("couldn't insert");
      } else {
        res.writeHead(200);
        res.end("inserted successfully");
      }
    }
  );
});
module.exports = router;
