const ChatService = require('../service/chat/chat.service');

const ChatNamespace = (io) => {
  const chatNamespace = io.of('/chat');

  chatNamespace.on('connection', (socket) => {
    socket.on('join_room', async (roomId) => {
      socket.join(roomId);
      const chat = await ChatService.findChatByRoomId(roomId);
      socket.emit('prev_message', chat);
    });

    socket.on('send_message', async ({ roomId, text, from, to }) => {
      try {
        await ChatService.addMessageToChat({
          roomId,
          text,
          from: from.id,
          to: to.id,
        });
        chatNamespace.to(roomId).emit('receive_message', { text, from, to });
      } catch (error) {
        chatNamespace.to(roomId).emit('fail_add_message', { text, from, to });
      }
    });
  });
};

module.exports = ChatNamespace;
