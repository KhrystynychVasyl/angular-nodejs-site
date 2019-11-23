const express = require("express");
const router = express.Router();

let todos = require("../controlers/todos.controller");
let users = require("../controlers/users.controller");
let products = require("../controlers/products.controller");
let keys = require("../controlers/keys.controller");

let images = require("../controlers/images.controller");

let selectMethodHandler = function(req, res, next) {
  MethodHandler = {
    "/todos": {
      post: todos.create,
      get: todos.findAll
    },
    "/todos/:id": {
      get: todos.findOne,
      put: todos.update
    },
    "/todos/:id-:_idUser": {
      delete: todos.delete
    },
    "/users": {
      post: users.create,
      get: users.findAll
    },
    "/users/:id": {
      get: users.findOne,
      put: users.findOne,
      delete: users.delete
    },
    "/products": {
      post: products.create,
      get: products.findAll
    },
    "/products/:id": {
      get: products.findOne,
      put: products.update,
      delete: products.delete
    },
    "/keys": {
      post: keys.create,
      get: keys.findAll
    },
    "/keys/:id": {
      get: keys.findOne,
      put: keys.findOne,
      delete: keys.delete
    },
    "/images": {
      post: images.createImage,
      get: images.findAllImage
    },
    "/images/:id": {
      get: images.findOneImage
    }
  };

  let url = req.route.path;
  let method = Object.keys(req.route.methods)[0];
  console.log(url, method);
  return MethodHandler[url][method](req, res, next);
};

router.get("/keys", selectMethodHandler);

router.post("/keys", selectMethodHandler);

router.get("/keys/:id", selectMethodHandler);

router.put("/keys/:id", selectMethodHandler);

router.delete("/keys/:id", selectMethodHandler);

router.get("/users", selectMethodHandler);

router.post("/users", selectMethodHandler);

router.get("/users/:id", selectMethodHandler);

router.put("/users/:id", selectMethodHandler);

router.delete("/users/:id", selectMethodHandler);

router.get("/todos", selectMethodHandler);

router.post("/todos", selectMethodHandler);

router.get("/todos/:id", selectMethodHandler);

router.put("/todos/:id", selectMethodHandler);

router.delete("/todos/:id-:_idUser", selectMethodHandler);

router.get("/products", selectMethodHandler);

router.post("/products", selectMethodHandler);

router.get("/products/:id", selectMethodHandler);

router.put("/products/:id", selectMethodHandler);

router.delete("/products/:id", selectMethodHandler);

router.get("/images", selectMethodHandler);

router.post("/images", selectMethodHandler);

router.get("/images/:id", selectMethodHandler);

module.exports = router;
