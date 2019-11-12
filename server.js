const express = require("express");
const fs = require("fs");
const path = require("path");

const server = express();

const PORT = process.env.PORT || 5678;

server.use(express.static(__dirname + "/dist/angular-nodejs-site"));
server.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "index.html"));
});
server.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/angular-nodejs-site/index.html"));
});

server.get("/users", function(req, res, next) {
  fs.readFile(path.join(__dirname  + "/server/data/users.json"), 'utf8', function(err, data) {
    res.send(JSON.stringify(JSON.parse(data)));
  });
  //res.send(JSON.stringify({ "users": { "id": "1", "name": "admin", "password": "pass", "access": true } }));
});

server.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listen:${PORT}`);
  }
});
