const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    meetup_date: { type: Date, required: true },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    _users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    _admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    _suggested_locations: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    ],
    _departure_locations: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('MeetUp', schema)
