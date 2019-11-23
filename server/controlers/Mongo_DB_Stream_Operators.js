const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const mongo = require("mongodb");

const multer = require("multer");

const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require("method-override");

const DATABASE_URL =
  "mongodb+srv://KorotkieRyki:KorotkieRyki@korotkieryki-hdfy2.mongodb.net/Angular-NodeJS-Site";
const DATABASE_NAME = "Angular-NodeJS-Site";
const dbCollectionName = "products_img";

const app = express();

app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

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
  gfs.collection(dbCollectionName);
});




const storage = new GridFsStorage({
  url: DATABASE_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: dbCollectionName
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

//@Route POST /upload
//@dest Upload file to DB
//upload.single("SomeString") "SomeString" => <input type="file" name="SomeString" id="file" class="custom-file-input"
app.post("/upload", upload.single("file"), (req, res) => {
  //res.json({ file: req.file });
  res.redirect("/");
});

// @route GET /
//@dest Loads form
// app.get("/", function(req, res) {
//   res.render("index", { files: false });
// });

app.get("/", function(req, res) {
  //res.render("index");
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      res.render("index", { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render("index", { files: files });
    }
  });
});

//@route GET /files
//@desc Display all files in JSON
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files

    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    }
    //Files exist
    return res.json(files);
  });
});

app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
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
});

//@route GET /image/:filename
//@desc Display Image

app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    // File exists
    return res.json(file);
  });
});

//@route DELETE /files/:id
//@desc Delete file
app.delete("/files/:id", (req, res) => {
  gfs.remove(
    { _id: req.params.id, root: dbCollectionName },
    (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect("/");
    }
  );
});

const PORT = process.env.PORT || 4567;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
