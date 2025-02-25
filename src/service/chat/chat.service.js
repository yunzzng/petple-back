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

  async findChatByRoomId(roomId) {
    try {
      const document = await Chat.findOne({ roomId }) //
        .populate({
          path: 'messages.from',
          populate: { path: 'userPet' },
        })
        .populate({ path: 'messages.to', populate: { path: 'userPet' } })
        .lean();
      return document;
    } catch (error) {
      throw createError(500, `[DB에러] ChatService.findChatByRoomId`);
    }
  }
}

module.exports = new ChatService();
