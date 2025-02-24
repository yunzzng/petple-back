const Chat = require('../../schemas/chat/chat.schema');
const { createError } = require('../../utils/error');

class ChatService {
  async addMessageToChat({ roomId, text, from, to }) {
    try {
      await Chat.findOneAndUpdate(
        { roomId },
        {
          $push: { messages: { text, from, to } },
        },
        { upsert: true },
      );
    } catch (error) {
      throw createError(500, `[DB에러] ChatService.addMessageToChat`);
    }
  }
}

module.exports = new ChatService();
