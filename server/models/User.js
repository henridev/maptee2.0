const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, default: '' },
    avatar_url: {
      type: String,
      default:
        'https://res.cloudinary.com/dri8yyakb/image/upload/v1569582674/optimap_icons/user_tmksk6.png',
    },
    facebook_id: { type: String },
    google_id: { type: String },
    _friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    _meetups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MeetUp' }],
    _friend_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'FriendRequest' },
    ],
    _meetup_requests: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'MeetupRequest' },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('User', schema)
