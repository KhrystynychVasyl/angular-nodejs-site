const express = require("express");
const router = express.Router();
const path = require("path");

const fs = require("fs");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

function postAddId(data) {
  data = data[data.length - 1];
  return data.id + 1;
}

let todos = require("./controlers/todo.controller.js");

router.get("/users", function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "/data/" + "usersList.json"),
    "utf8",
    function(err, data) {
      if (data) {
        res.send(JSON.stringify(JSON.parse(data)));
      } else {
        fs.writeFile(
          "./server/data/usersList.json",
          JSON.stringify([
            { id: "1", name: "admin", password: "pass", access: true }
          ]),
          function(err, data) {}
        );
        res.send([{ id: "1", name: "admin", password: "pass", access: true }]);
      }
    }
  );
});

router.post("/users", jsonParser, function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "/data/" + "usersList.json"),
    "utf8",
    function(err, data) {
      if (data) {
        data = JSON.parse(data);
        req.body.id = postAddId(data);
        data.push(req.body);
        fs.writeFile(
          "./server/data/usersList.json",
          JSON.stringify(data),
          function(err, data) {}
        );
        res.json(req.body);
      } else {
        req.body.id = 1;
        fs.writeFile(
          "./server/data/usersList.json",
          JSON.stringify(req.body),
          function(err, data) {}
        );
        res.json(req.body);
      }
    }
  );
});

router.post("/users", jsonParser, function(req, res, next) {
  fs.readFile(path.join(__dirname + "/data/users.json"), "utf8", function(
    err,
    data
  ) {
    data = JSON.parse(data);
    let test = data.hasOwnProperty(req.body.item);
    if (!test) {
      data[req.body.item] = 1;
      fs.writeFile("todolist.json", JSON.stringify(data), function(
        err,
        data
      ) {});
      res.json({
        message: "Added"
      });
    } else {
      res.json({
        message: "Already added"
      });
    }
  });
});

router.delete("/users/:id", jsonParser, function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "/data/" + "usersList.json"),
    "utf8",
    function(err, data) {
      data = JSON.parse(data);
      data = data.filter(el => el.id !== parseInt(req.params.id, 10));
      fs.writeFile(
        "./server/data/usersList.json",
        JSON.stringify(data),
        function(err, data) {}
      );
      res.end();
    }
  );
});

router.get("/todos", todos.findAll);

router.get("/todos/:id", todos.findOne);

router.post("/todos", todos.create);

router.put("/todos/:id", todos.update);

router.delete("/todos/:id", todos.delete);

router.get("/products", function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "/data/" + "productsList.json"),
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
});

router.post("/products", jsonParser, function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "/data/" + "productsList.json"),
    "utf8",
    function(err, data) {
      if (data) {
        data = JSON.parse(data);
        req.body.id = postAddId(data);
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
});

router.delete("/products/:id", jsonParser, function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "/data/" + "productsList.json"),
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

module.exports = router;
