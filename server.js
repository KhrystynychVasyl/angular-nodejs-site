const express = require("express");
const fs = require("fs");
const path = require("path");

const server = express();

const PORT = process.env.PORT || 5678;

server.use(require("./server/corsMiddleWare.js"));

server.use(express.static(__dirname + "/dist/angular-nodejs-site"));

server.use("/api", require("./server/api.js"));

server.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "index.html"));
});

server.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/angular-nodejs-site/index.html"));
});

server.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listen:${PORT}`);
  }
});
