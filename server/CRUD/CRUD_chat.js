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
  return await User.findById(userId)
    .select('_chats')
    .populate({
      path: '_chats',
      populate: populateQuery,
    })
}

module.exports.createChat = createChat
module.exports.getChats = getChats
