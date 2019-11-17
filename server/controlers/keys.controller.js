let db = require("./MongoDB_CRUD_Operations");
let dbCollectionName = "keysList";

exports.findOne = function(req, res, next) {
  console.log("keys_findOne", req.body);
  db.findOne(dbCollectionName, req.body, function(result) {
    res.send(result.length > 0);
  });
};

exports.delete = function(req, res, next) {
  db.deleteOne(dbCollectionName, req.params.id, function(result) {
    res.end();
  });
};

exports.create = function(req, res, next) {
  body = { add: { isMany: false, data: req.body } };
  db.create(dbCollectionName, body.add, function(result) {
    let midValue = result.ops[0];
    res.send(midValue);
  });
};

exports.findAll = function(req, res, next) {
  db.findAll(dbCollectionName, function(result) {
    res.send(result);
  });
};

exports.update = function(req, res, next) {
  body = { put: { updateNew: req.body } };
  db.update(dbCollectionName, body.put, req.params.id, function(result) {
    res.end();
  });
};
