const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const assert = require("assert");

const DATABASE_URL =
  "mongodb+srv://korotkieryki-hdfy2.mongodb.net/Angular-NodeJS-Site";
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

// MongoClient.connect(uri).then(client => client.db("db").col
//lection("users").find()).then(data => console.log(data)).catch(err => console.log(err));

exports.findAll = function(dbCollectionName, callback) {
  console.log("MB_FindAll", dbCollectionName);
  database
    .collection(dbCollectionName)
    .find({})
    .toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
};

exports.create = function(dbCollectionName, body, callback) {
  console.log("MB_Creat", dbCollectionName, body);
  if (!body.isMany) {
    database
      .collection(dbCollectionName)
      .insertOne(body.data, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result.insertedCount);
        result.connection ? delete result.connection : "";
        result.message ? delete result.message : "";
        //console.log(result)
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
  console.log("MB_Upd", dbCollectionName, body, id);
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

exports.findOne = function(dbCollectionName, body, callback) {
  console.log("MB_FindOne", dbCollectionName, body);
  let find;
  switch (dbCollectionName) {
    case "usersList":
      find = body;
      break;
    case "keysList":
      find = body;
      break;
    default:
      find = new ObjectId(body);
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
  console.log("MB_Del", dbCollectionName, body);

  let find;
  switch (dbCollectionName) {
    case "usersList":
      find = body;
      break;
    case "keysList":
      find = body;
      break;
    default:
      find = { _id: new ObjectId(body) };
  }

  database.collection(dbCollectionName).deleteOne(find, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    result.connection ? delete result.connection : "";
    result.message ? delete result.message : "";
    callback(result);
  });
};

const path = require("path");
const crypto = require("crypto");

const multer = require("multer");

const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url:
    "mongodb+srv://KorotkieRyki:KorotkieRyki@korotkieryki-hdfy2.mongodb.net/Angular-NodeJS-Site",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: req.query.collection
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

exports.createImage = function(req, res, callback) {
  console.log("MB_CreateImage");
  upload.single(req.query.fileType)(req, res, err => {
    if (err) {
      res.send(err);
    }
    let answer = {};
    answer.imageUrl = `${req.baseUrl}/${res.req.query.collection}/${res.req.file.filename}`;
    res.send(answer);
  });
};

const mongo = require("mongodb");
const Grid = require("gridfs-stream");

let gfs;

function open() {
  // Connection URL. This is where your mongodb server is running.
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      DATABASE_URL,
      {
        auth: { user: "KorotkieRyki", password: "KorotkieRyki" },
        useNewUrlParser: true
      },
      (error, client) => {
        if (error) {
          reject(error);
        }
        resolve(client.db(DATABASE_NAME));
      }
    );
  });
}

open().then(db => {
  gfs = Grid(db, mongo);
});

exports.findOneImg = function(req, res, callback) {
  gfs.collection(req.route.path.split("/")[1]);
  gfs.files.findOne({ filename: req.params.id }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    // Check if image

    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // read output to browser
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
};
