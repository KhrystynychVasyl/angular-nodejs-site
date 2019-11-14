const path = require("path");
const fs = require("fs");

function postAddId(data) {
  data = data[data.length - 1];
  return data.id + 1;
}

exports.create = function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "./../data/" + "todosList.json"),
    "utf8",
    function(err, data) {
      if (data) {
        data = JSON.parse(data);
        req.body.id = postAddId(data);
        data.push(req.body);
        fs.writeFile(
          "./server/data/todosList.json",
          JSON.stringify(data),
          function(err, data) {}
        );
        res.json(req.body);
      } else {
        req.body.id = 1;
        fs.writeFile(
          "./server/data/todosList.json",
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
    path.join(__dirname + "./../data/" + "todosList.json"),
    "utf8",
    function(err, data) {
      if (data) {
        res.send(JSON.stringify(JSON.parse(data)));
      } else {
        fs.writeFile(
          "./server/data/todosList.json",
          JSON.stringify([
            { id: 1, title: "some1", complete: false },
            { id: 2, title: "some2", complete: false },
            { id: 3, title: "some3", complete: false }
          ]),
          function(err, data) {}
        );
        res.send([
          { id: 1, title: "some1", complete: false },
          { id: 2, title: "some2", complete: false },
          { id: 3, title: "some3", complete: false }
        ]);
      }
    }
  );
};

exports.findOne = function(req, res, next) {
  let inId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname + "./../data/" + "todosList.json"),
    "utf8",
    function(err, data) {
      data = JSON.parse(data);
      let check = Boolean(data.find(el => el.id === inId));
      if (check) {
        res.send(data.find(el => el.id === inId));
      } else {
        res.status(404).send("Not found ToDo");
      }
    }
  );
};

exports.update = function(req, res, next) {
  let id = parseInt(req.params.id);
  let updatedTodo = req.body;

  fs.readFile(
    path.join(__dirname + "./../data/" + "todosList.json"),
    "utf8",
    function(err, data) {
      data = JSON.parse(data);
      let todo = data.find(el => el.id === id);
      if (todo) {
        Object.assign(todo, updatedTodo);
        fs.writeFile(
          "./server/data/todosList.json",
          JSON.stringify(data),
          function(err, data) {}
        );
        res.end();
      } else {
        console.log("error");
        res.status(404).send("Not found ToDo");
      }
    }
  );
};

exports.delete = function(req, res, next) {
  fs.readFile(
    path.join(__dirname + "./../data/" + "todosList.json"),
    "utf8",
    function(err, data) {
      data = JSON.parse(data);
      data = data.filter(el => el.id !== parseInt(req.params.id, 10));
      fs.writeFile(
        "./server/data/todosList.json",
        JSON.stringify(data),
        function(err, data) {}
      );
      res.end();
    }
  );
};
