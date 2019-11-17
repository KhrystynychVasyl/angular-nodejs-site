let db = require("./MongoDB_CRUD_Operations");
let dbCollectionName = "usersList";

exports.findOne = function(req, res, next) {
  db.findOne(dbCollectionName, req.body, function(result) {
    let response = {};
    if (result.length > 0) {
      response._id = result[0]._id;
      response.check = true;
    }
    console.log("findOne",response);
    res.send(response);
  });
};

exports.create = function(req, res, next) {
  body = { add: { isMany: false, data: req.body } };
  db.create(dbCollectionName, body.add, function(result) {
    let response = {};
    if (result.length > 0) {
      response._id = result[0]._id;
      response.check = true;
    }
    console.log('create',response);
    res.send(response);
  });
};

exports.update = function(req, res, next) {
  console.log(req, body);
  body = { put: { updateNew: req.body } };
  db.update(dbCollectionName, body.put, req.params.id, function(result) {
    res.end();
  });
};

exports.delete = function(req, res, next) {
  db.deleteOne(dbCollectionName, req.params.id, function(result) {
    res.end();
  });
};

exports.findAll = function(req, res, next) {
  db.findAll(dbCollectionName, function(result) {
    res.send(result);
  });
};
