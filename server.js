const express = require("express");
const path = require("path");

const server = express();

const PORT = process.env.PORT || 5678;

server.use(express.static(__dirname + "/dist/angular-nodejs-site"));
server.get('*',function(req,res){
  res.sendFile(path.join(__dirname + 'index.html'))
})

server.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listen:${PORT}`);
  }
});