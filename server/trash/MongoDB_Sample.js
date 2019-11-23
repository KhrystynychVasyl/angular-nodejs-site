const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb+srv://korotkieryki-hdfy2.mongodb.net/test";

// Database Name
const dbName = "myproject";

// Create a new MongoClient
const client = new MongoClient(url, {
  auth: {
    user: "KorotkieRyki",
    password: "KorotkieRyki"
  }
});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  insertDocuments(db, function() {
    client.close();
  });
});

let body1 = [{ a: 1 }, { a: 2 }, { a: 3 }];
let body2 = { a: 3 };

console.log(typeof body1, typeof body2);

exports.create = function(dbName, dbCollectionName, body) {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const insertDocuments = function(db, callback) {
      // Get the documents collection
      const collection = db.collection(dbCollectionName);
      // Insert some documents
      collection.insertMany(body, function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
      });
    };
    insertDocuments(db, function() {
      client.close();
    });
  });
};

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("documents");
  // Insert some documents
  collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("documents");
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const findDocumentsFilter = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("documents");
  // Find some documents
  collection.find({ a: 3 }).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("documents");
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
};

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("documents");
  // Delete document where a is 3
  collection.deleteOne({ a: 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
};

const indexCollection = function(db, callback) {
  db.collection("documents").createIndex({ a: 1 }, null, function(
    err,
    results
  ) {
    console.log(results);
    callback();
  });
};