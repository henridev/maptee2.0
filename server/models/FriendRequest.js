const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  _requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
})

module.exports = mongoose.model('FriendRequest', schema)
