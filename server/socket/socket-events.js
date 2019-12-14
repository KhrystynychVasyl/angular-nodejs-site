const users = {};

// module.exports = function(socket) {
//   socket.on('new-user', name => {
//     users[socket.id] = name;
//     socket.broadcast.emit('user-connected', name);
//   });
//   socket.on('send-chat-message', message => {
//     socket.broadcast.emit('chat-message', {
//       message: message,
//       name: users[socket.id]
//     });
//   });
//   socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', users[socket.id]);
//     delete users[socket.id];
//   });
// };

module.exports = function(io) {
  io.on('connection', socket => {
    socket.on('new-user', data => {
      users[socket.id] = { userId: data.userId, nickName: data.nickName };
      data.messageType = 'user-connected';
      io.sockets.emit('chatMessage', data);
      // users[data.userId] = data.nickName;
      // socket.emit('user-connected', { description: 'Hey, welcome!' });
      // socket.broadcast.emit('user-connected', data);
    });
    socket.on('send-chat-message', data => {
      data.messageType = 'chat-message';
      io.sockets.emit('chatMessage', data);
    });
    socket.on('disconnect', () => {
      let data = {};
      data.userId = users[socket.id].userId;
      data.nickName = users[socket.id].nickName;
      data.messageType = 'user-disconnected';
      socket.broadcast.emit('chatMessage', data);
      delete users[socket.id];
    });
  });
};
