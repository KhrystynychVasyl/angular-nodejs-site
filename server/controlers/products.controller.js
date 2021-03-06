let db = require("./MongoDB_CRUD_Operations");
let dbCollectionName = "productsList";

function getUser(req) {
  [method, path] = [req.route.stack[0].method, req.route.path.split("/")[1]];

  let user = "";
  let data = {};
  switch (method) {
    case "get":
      if (req._parsedOriginalUrl.query) {
        user =
          "_" + decodeURIComponent(req._parsedOriginalUrl.query.split("=")[1]);
      } else {
        user = "_";
      }
      break;
    case "post":
      user = "_" + req.body._idUser;
      data = req.body.data;
      break;
    case "put":
      user = "_" + req.body._idUser;
      data = req.body.data;
      break;
    case "delete":
      if (req.params._idUser === "JohnDoe") {
        user = "_";
      } else {
        user = "_" + req.params._idUser;
      }
      break;
  }

  //console.log(req, method, path, user, data);
  //console.log(method, path, user, data);
  return [req, method, path, user, data];
}

exports.create = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);

  db.create(dbCollectionName, req.body, function(result) {
    let midValue = result.ops[0];
    console.log(midValue)
    res.send(midValue);
  });
};

exports.findAll = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);
  db.findAll(dbCollectionName, function(result) {
    res.send(result);
  });
};

exports.findOne = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);
  db.findOneImg(req, res);
};

exports.update = function(req, res, next) {};

exports.delete = function(req, res, next) {};
