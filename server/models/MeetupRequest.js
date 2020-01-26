const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MeetupRequestSchema = new Schema({
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
  _meetup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MeetUp',
  },
})

module.exports = mongoose.model('MeetupRequest', MeetupRequestSchema)
