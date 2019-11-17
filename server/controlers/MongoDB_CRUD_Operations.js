const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const assert = require("assert");

const DATABASE_URL = "mongodb+srv://korotkieryki-hdfy2.mongodb.net/test";
const DATABASE_NAME = "Angular-NodeJS-Site";

let database;

MongoClient.connect(
  DATABASE_URL,
  {
    auth: { user: "KorotkieRyki", password: "KorotkieRyki" },
    useNewUrlParser: true
  },
  (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
  }
);


// MongoClient.connect(uri).then(client => client.db("db").collection("users").find()).then(data => console.log(data)).catch(err => console.log(err));

exports.findAll = function(dbCollectionName, callback) {
  database
    .collection(dbCollectionName)
    .find({})
    .toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
};

exports.create = function(dbCollectionName, body, callback) {
  if (!body.isMany) {
    database
      .collection(dbCollectionName)
      .insertOne(body.data, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result.insertedCount);
        result.connection ? delete result.connection : "";
        result.message ? delete result.message : "";
        callback(result);
      });
  } else {
    database
      .collection(dbCollectionName)
      .insertMany(body.data, function(err, result) {
        assert.equal(null, err);
        assert.equal(body.data.length, result.insertedCount);
        callback(result);
      });
  }
};

exports.update = function(dbCollectionName, body, id, callback) {
  database
    .collection(dbCollectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: body.updateNew }, function(
      err,
      result
    ) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      result.connection ? delete result.connection : "";
      result.message ? delete result.message : "";
      callback(result);
    });
};

exports.findOne = function(dbCollectionName, data, callback) {
  let find;
  switch (dbCollectionName) {
    case "usersList":
      find = data;
      break;
    case "keysList":
      find = data;
      break;
    default:
      find = new ObjectId(data);
  }
  database
    .collection(dbCollectionName)
    .find(find)
    .toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
};

exports.deleteOne = function(dbCollectionName, body, callback) {
  database
    .collection(dbCollectionName)
    .deleteOne(body.data, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      result.connection ? delete result.connection : "";
      result.message ? delete result.message : "";
      callback(result);
    });
};
