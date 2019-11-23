let db = require("./MongoDB_CRUD_Operations");

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
    case "delete":
      if (req.params._idUser === "JohnDoe") {
        user = "_";
      } else {
        user = "_" + req.params._idUser;
      }
      break;
  }

  //console.log(req, method, path, user, data);
  //console.log(method, path, user, data);
  return [req, method, path, user, data];
}

exports.createImage = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);
  db.createImage(req, res);
};

exports.findOneImage = function(req, res, next) {
  [req, method, path, user, data] = getUser(req);
  db.findOneImg(req, res);
};

exports.findAllImage = function(req, res, next) {};

exports.update = function(req, res, next) {};

exports.delete = function(req, res, next) {};
