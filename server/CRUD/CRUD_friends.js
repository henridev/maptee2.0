const FriendRequest = require('../models/FriendRequest')
const User = require('../models/User')

const createAddRequest = async (friendmail, senderid) => {
  console.log(friendmail)
  let foundUser = await User.findOne({ email: friendmail })
  if (!foundUser) {
    return false
  }
  let createdRequest = await FriendRequest.create({
    _requester: senderid,
    _recipient: foundUser._id,
    status: false,
  })
  await User.findByIdAndUpdate(
    foundUser._id,
    { $addToSet: { _friend_requests: createdRequest._id } },
    { new: true }
  )
  await User.findByIdAndUpdate(
    senderid,
    { $addToSet: { _friend_requests: createdRequest._id } },
    { new: true }
  )
  return true
}

const acceptRequest = async requestId => {
  let foundRequest = await FriendRequest.findById(requestId)
  let recipientId = foundRequest._recipient
  let requesterId = foundRequest._requester
  await User.findByIdAndUpdate(
    recipientId,
    {
      $pull: { _friend_requests: requestId },
      $addToSet: { _friends: requesterId },
    },
    { new: true }
  )
  await User.findByIdAndUpdate(
    requesterId,
    {
      $pull: { _friend_requests: requestId },
      $addToSet: { _friends: recipientId },
    },
    { new: true }
  )
  return true
}

const declineRequest = async requestId => {
  let foundRequest = await FriendRequest.findById(requestId)
  let recipientId = foundRequest._recipient
  let requesterId = foundRequest._requester
  await User.findByIdAndUpdate(
    recipientId,
    { $pull: { _friend_requests: requestId } },
    { new: true }
  )
  await User.findByIdAndUpdate(
    requesterId,
    { $pull: { _friend_requests: requestId } },
    { new: true }
  )
  return true
}

module.exports.createAddRequest = createAddRequest
module.exports.acceptRequest = acceptRequest
module.exports.declineRequest = declineRequest
