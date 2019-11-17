const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const assert = require("assert");

const CONNECTION_URL = "mongodb+srv://korotkieryki-hdfy2.mongodb.net/test";
const DATABASE_NAME = "Angular-NodeJS-Site";
const COLLECTION_NAME = "todosList";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

MongoClient.connect(
  CONNECTION_URL,
  {
    auth: {
      user: "KorotkieRyki",
      password: "KorotkieRyki"
    },
    useNewUrlParser: true
  },
  (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
  }
);

let findAll = function(dbCollectionName, callback) {
  database
    .collection(dbCollectionName)
    .find({})
    .toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
};

app.listen(3000, () => {});

app.get("/people", (request, response) => {
  let body;
  findAll(COLLECTION_NAME, function(res) {
    body = res;
    console.log(body);
    response.send(body);
  });

  //   collection.find({}).toArray((error, result) => {
  //     if (error) {
  //       return response.status(500).send(error);
  //     }
  //     response.send(result);
  //  });
});

app.post("/person", (request, response) => {
    database.collection("todosList").insertOne(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});
