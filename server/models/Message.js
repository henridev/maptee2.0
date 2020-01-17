const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('Message', schema)
