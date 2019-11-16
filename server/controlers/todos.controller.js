const path = require("path");
const fs = require("fs");

let db = require("./MongoDB_CRUD_Operations");

let dbName = "Angular-NodeJS-Site";
let dbCollectionName = "todosList";

exports.create = function(req, res, next) {
  body = {
    add: {
      isMany: false,
      data: req.body
    }
  };
  db.create(dbName, dbCollectionName, body.add, function(result) {
    let midValue = result.ops[0];

    fs.readFile(
      path.join(__dirname + "./../data/" + "todosList.json"),
      "utf8",
      function(err, data) {
        if (data) {
          data = JSON.parse(data);
          data.push(midValue);
          fs.writeFile(
            "./server/data/todosList.json",
            JSON.stringify(data),
            function(err, data) {}
          );
          res.json(midValue);
        } else {
          midValue.id = 1;
          fs.writeFile(
            "./server/data/todosList.json",
            JSON.stringify(midValue),
            function(err, data) {}
          );
          res.json(midValue);
        }
      }
    );
  });
};

exports.findAll = function(req, res, next) {
  db.findAll(dbName, dbCollectionName, function(result) {
    console.log(result);

    fs.readFile(
      path.join(__dirname + "./../data/" + "todosList.json"),
      "utf8",
      function(err, data) {
        if (data) {
          res.send(JSON.stringify(JSON.parse(data)));
        } else {
          const test = [
            {
              title:
                "Не удаляйте хоча б ОДНЕ повідомлення бо може вилетіти сайт\n23:48:54 PM",
              complete: false,
              id: 22
            },
            { title: "УРА!!!\n23:48:57 PM", complete: false, id: 23 },
            {
              title: "Треба лягати спати))\n23:49:02 PM",
              complete: false,
              id: 24
            }
          ];

          fs.writeFile(
            "./server/data/todosList.json",
            JSON.stringify(test),
            function(err, data) {}
          );
          res.send(test);
        }
      }
    );
  });
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
