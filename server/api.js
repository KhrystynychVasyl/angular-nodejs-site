const express = require('express');
const router = express.Router();
const path = require('path');

const fs = require("fs");
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.get('/todo', function(req, res, next) {
  fs.readFile(path.join(__dirname + "/.." + "/data/" + "todolist.json"), 'utf8', function(err, data) {
    res.send(JSON.stringify(JSON.parse(data)));
  });
});

router.post('/todo', jsonParser, function(req, res, next) {
  fs.readFile(path.join(__dirname + "/.." + "/data/" + "todolist.json"), 'utf8', function(err, data) {
    data = JSON.parse(data);
    let test = data.hasOwnProperty(req.body.item);
    if (!test) {
      data[req.body.item] = 1;
      fs.writeFile('todolist.json', JSON.stringify(data), function(err, data) {});
      res.json({
        message: 'Added'
      })
    } else {
      res.json({
        message: 'Already added'
      })
    }
  })
});
/*
router.delete('/todo/del', jsonParser, function(req, res, next) {
  fs.readFile(path.join(__dirname + "/.." + "/" + "todolist.json"), 'utf8', function(err, data) {
    if (req.body.delete === "" || req.body.delete) {
      data = JSON.parse(data);
      delete data[req.body.delete];
      fs.writeFile('todolist.json', JSON.stringify(data), function(err, data) {});
      res.send(true)
    } else {
      res.send(false)
    }
  })
});
*/
router.delete('/todo/:id', jsonParser, function(req, res, next) {
  fs.readFile(path.join(__dirname + "/.." + "/data/" + "todolist.json"), 'utf8', function(err, data) {
      data = JSON.parse(data);
      delete data[req.params.id];
      fs.writeFile('todolist.json', JSON.stringify(data), function(err, data) {});
      res.send(true);
  })
});

module.exports = router;
