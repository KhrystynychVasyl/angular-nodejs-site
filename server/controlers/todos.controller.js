let db = require("./MongoDB_CRUD_Operations");
let dbCollectionName = "todosList";

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
  }
  console.log(req, method, path, user, data);

  return [req, method, path, user, data];
}

exports.findAll = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);
  db.findAll(dbCollectionName + user, function(result) {
    res.send(result);
  });
};

exports.create = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);
  body = { add: { isMany: false, data: data } };
  db.create(dbCollectionName + user, body.add, function(result) {
    let midValue = result.ops[0];
    res.send(midValue);
  });
};

exports.update = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);
  body = { put: { updateNew: data } };
  db.update(dbCollectionName + user, body.put, req.params.id, function(result) {
    res.end();
  });
};

exports.findOne = function(req, res, next) {
  db.findOne(dbCollectionName, req.params.id, function(result) {
    res.send(result);
  });
};

exports.delete = function(req, res, next) {
  db.deleteOne(dbCollectionName, req.params.id, function(result) {
    res.end();
  });
};
