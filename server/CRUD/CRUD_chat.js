const Chat = require('../models/Chat')
const Message = require('../models/Message')
const User = require('../models/User')

const createChat = async userIds => {
  if (!Array.isArray(userIds)) {
    userIds = Object.values(userIds)
  }
  const createdChat = await Chat.create({ _users: userIds })
  const userUpdatePromises = createdChat._users.map(id => {
    return User.findByIdAndUpdate(
      id,
      { $push: { _chats: createdChat._id } },
      { new: true }
    )
  })
  return await Promise.all(userUpdatePromises)
}

const getChats = async userId => {
  const populateQuery = [
    { path: '_messages' },
    {
      path: '_users',
      match: { _id: { $ne: userId } }, // only return user that are not you
      select: '_id avatar_url username firstName lastName',
    },
  ]
  const chatObject = await User.findById(userId)
    .select('_chats')
    .populate({
      path: '_chats',
      populate: populateQuery,
    })
  const sortedChats = chatObject._chats.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    // if b date is > 0 put it up front --> most recent first
    const updateB = new Date(b.updated_at)
    const updateA = new Date(a.updated_at)
    if (updateB > updateA) {
      return 1
    }
    if (updateB < updateA) {
      return -1
    }
    if (updateB === updateA) {
      return 0
    }
  })
  return sortedChats
}

const addMessage = async (msg, userId, chatId) => {
  const newmessage = await Message.create({ content: msg, user: userId })
  const MessageId = newmessage._id
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $addToSet: { _messages: MessageId } },
    { new: true }
  )
  return updatedChat
}

module.exports = {
  createChat,
  getChats,
  addMessage,
}
