let db = require("./MongoDB_CRUD_Operations");
let dbCollectionName = "todosList";
exports.findAll = function(req, res, next) {
  db.findAll(dbCollectionName, function(result) {
    res.send(result);
  });
};

exports.create = function(req, res, next) {
  body = { add: { isMany: false, data: req.body } };
  db.create(dbCollectionName, body.add, function(result) {
    let midValue = result.ops[0];
    res.send(midValue);
  });
};

exports.update = function(req, res, next) {
  body = { put: { updateOld: { id: req.params.id }, updateNew: req.body } };
  db.update(dbCollectionName, body.put, function(result) {
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
