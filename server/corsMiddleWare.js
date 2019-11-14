const corsMiddleWare = function(req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // update to match the domain you will make the request from
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //=> res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
};

module.exports = corsMiddleWare;

//var cors = require("cors");

// use it before all route definitions
//app.use(cors({ origin: "http://localhost:8888" }));

// //CORS middleware
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }

// //...
// app.configure(function() {
//     app.use(express.bodyParser());
//     app.use(express.cookieParser());
//     app.use(express.session({ secret: 'cool beans' }));
//     app.use(express.methodOverride());
//     app.use(allowCrossDomain);
//     app.use(app.router);
//     app.use(express.static(__dirname + '/public'));
// });
