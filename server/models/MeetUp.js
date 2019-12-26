const mongoose = require('mongoose')

const MeetUp = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    meetup_date: { type: Date, required: true },
    meetup_time: { type: Date, required: true },
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

const MeetUp = mongoose.model('MeetUp', MeetUpSchema)

module.exports = MeetUp
