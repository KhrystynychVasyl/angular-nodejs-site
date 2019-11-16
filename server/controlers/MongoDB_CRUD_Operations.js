const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb+srv://korotkieryki-hdfy2.mongodb.net/test";

// // Database Name
//const dbName = "myproject";

// Create a new MongoClient
const client = new MongoClient(url, {
  auth: {
    user: "KorotkieRyki",
    password: "KorotkieRyki"
  }
});

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);
//   const collection = db.collection(dbCollectionName);
//   collection.insertOne(body.data, function(err, result) {
//     // todo some
//     client.close();
//   });
// });

// let bodyMany = {
//   add: {
//     isMany: true,
//     data: [
//       {
//         title: "Test\n23:48:54 PM",
//         complete: false,
//         id: 22
//       },
//       { title: "УРА!!!\n23:48:57 PM", complete: false, id: 23 },
//       {
//         title: "Треба лягати спати))\n23:49:02 PM",
//         complete: false,
//         id: 24
//       }
//     ]
//   },
//   put: {
//     updateOld: {
//       title: "Test\n23:48:54 PM"
//     },
//     updateNew: { complete: true }
//   },
//   delete: {
//     data: { title: "УРА!!!\n23:48:57 PM", complete: false, id: 23 }
//   },
//   getOne: {
//     data: { id: 24 }
//   }
// };

// let bodyOne = {
//   add: {
//     isMany: false,
//     data: {
//       title: "Test\n23:48:54 PM",
//       complete: false,
//       id: 22
//     }
//   },
//   put: {
//     updateOld: {
//       title: "Test\n23:48:54 PM",
//       complete: false,
//       id: 22
//     },
//     updateNew: { complete: true }
//   },
//   delete: {
//     data: {
//       title: "Test\n23:48:54 PM",
//       complete: false,
//       id: 22
//     }
//   },
//   getOne: {
//     data: { id: 24 }
//   }
// };

// let dbName = "Angular-NodeJS-Site";
// let dbCollectionName = "todosList";

exports.findAll = function(dbName, dbCollectionName, callback) {
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
      client.close();
    });
  });
};

exports.create = function(dbName, dbCollectionName, body, callback) {
  console.log(333);
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);
    if (!body.isMany) {
      collection.insertOne(body.data, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result.insertedCount);
        result.connection ? delete result.connection : "";
        result.message ? delete result.message : "";
        callback(result);
        client.close();
      });
    } else {
      collection.insertMany(body.data, function(err, result) {
        assert.equal(null, err);
        assert.equal(body.data.length, result.insertedCount);
        callback(result);
        client.close();
      });
    }
  });
};

exports.update = function(dbName, dbCollectionName, body, callback) {
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);
    collection.updateOne(body.updateOld, { $set: body.updateNew }, function(
      err,
      result
    ) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      result.connection ? delete result.connection : "";
      result.message ? delete result.message : "";
      callback(result);
      client.close();
    });
  });
};

exports.findOne = function(dbName, dbCollectionName, body, callback) {
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);
    collection.find(body.data).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
      client.close();
    });
  });
};

exports.deleteOne = function(dbName, dbCollectionName, body, callback) {
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);
    collection.deleteOne(body.data, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      result.connection ? delete result.connection : "";
      result.message ? delete result.message : "";
      callback(result);
      client.close();
    });
  });
};
