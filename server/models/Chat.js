const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    isGroupChat: { type: Boolean, default: false },
    _messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    _users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('Chat', schema)
