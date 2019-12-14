const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');

// const io = require('socket.io')()
// io.attach(http, {
//     pingInterval: 10000,
//     pingTimeout: 5000,
//     cookie: false
// });
// require("./server/socket/socket-events.js")(io);

// const io = require('socket.io')(http);
// io.on('connection', socket => {
//   console.log(socket.id);
//   require('./server/socket/socket-events.js')(socket);
// });

const io = require('socket.io')(http);
require('./server/socket/socket-events.js')(io);

const PORT = process.env.PORT || 5678;

app.use(require('./server/routers/corsMiddleWare.js'));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/angular-nodejs-site'));

app.use('/api', require('./server/routers/api.js'));

app.use(express.static(path.resolve(__dirname, 'server/public')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/angular-nodejs-site/index.html'));
});

http.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listen:${PORT}`);
  }
});
