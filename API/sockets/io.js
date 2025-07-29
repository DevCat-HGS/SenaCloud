let io;

module.exports = {
  init: function(server) {
    io = require('socket.io')(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    return io;
  },
  getIO: function() {
    if (!io) {
      throw new Error('Socket.io no está inicializado');
    }
    return io;
  }
};