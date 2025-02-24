const ChatNamespace = (io) => {
  const chatNamespace = io.of('/chat');

  chatNamespace.on('connection', (socket) => {
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
    });

    socket.on('send_message', ({ roomId, text, from, to }) => {
      chatNamespace.to(roomId).emit('receive_message', { text, from, to });
    });
  });
};

module.exports = ChatNamespace;
