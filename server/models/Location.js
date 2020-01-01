const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pointSchema = new Schema({
  // this schema includes 2 shematypes type and coordinates
  // when mongoose finds nested prop named type it assumes it needs
  // to define a shematype with the given type
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    default: [0, 0],
    required: true,
  },
})

const Location = new Schema(
  {
    _location: {
      // location needs to be defined like pointschema
      type: pointSchema,
      required: true,
    },
    _votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    _creator: { type: mongoose.SchemaType.Types.ObjectId, ref: 'User' },
    isDeparture: { type: Boolean },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)
// use the schema by instantiating a model
const Location = mongoose.model('Location', MeetUpSchema)

module.exports = Location
