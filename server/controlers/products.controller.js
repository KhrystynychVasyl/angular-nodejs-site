const path = require("path");
const fs = require("fs");

exports.create = function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "./../data/" + "productsList.json"),
    "utf8",
    function(err, data) {
      if (data) {
        data = JSON.parse(data);
        //req.body.id = postAddId(data);
        data.push(req.body);
        fs.writeFile(
          "./server/data/productsList.json",
          JSON.stringify(data),
          function(err, data) {}
        );
        res.json(req.body);
      } else {
        req.body.id = 1;
        fs.writeFile(
          "./server/data/productsList.json",
          JSON.stringify(req.body),
          function(err, data) {}
        );
        res.json(req.body);
      }
    }
  );
};

exports.findAll = function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "./../data/" + "productsList.json"),
    "utf8",
    function(err, data) {
      if (data) {
        res.send(JSON.stringify(JSON.parse(data)));
      } else {
        fs.writeFile(
          "./server/data/productsList.json",
          JSON.stringify([
            { id: 1, title: "IPhone", price: 300 },
            { id: 2, title: "IPad", price: 250 },
            { id: 3, title: "IMac", price: 500 }
          ]),
          function(err, data) {}
        );
        res.send([
          { id: 1, title: "IPhone", price: 300 },
          { id: 2, title: "IPad", price: 250 },
          { id: 3, title: "IMac", price: 500 }
        ]);
      }
    }
  );
};

exports.findOne = function(req, res, next) {
  let inId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname + "./../data/" + "productsList.json"),
    "utf8",
    function(err, data) {
      data = JSON.parse(data);
      let check = Boolean(data.find(el => el.id === inId));
      if (check) {
        res.send(data.find(el => el.id === inId));
      } else {
        res.status(404).send("Not found Product");
      }
    }
  );
};

exports.update = function(req, res, next) {
  let id = parseInt(req.params.id);
  let updatedTodo = req.body;

  fs.readFile(
    path.join(__dirname + "./../data/" + "productsList.json"),
    "utf8",
    function(err, data) {
      data = JSON.parse(data);
      let todo = data.find(el => el.id === id);
      if (todo) {
        Object.assign(todo, updatedTodo);
        fs.writeFile(
          "./server/data/productsList.json",
          JSON.stringify(data),
          function(err, data) {}
        );
        res.end();
      } else {
        console.log("error");
        res.status(404).send("Not found Product");
      }
    }
  );
};

exports.delete = function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "./../data/" + "productsList.json"),
    "utf8",
    function(err, data) {
      data = JSON.parse(data);
      data = data.filter(el => el.id !== parseInt(req.params.id, 10));
      fs.writeFile(
        "./server/data/productsList.json",
        JSON.stringify(data),
        function(err, data) {}
      );
      res.end();
    }
  );
};
