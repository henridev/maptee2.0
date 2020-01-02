const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
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
  },
})

const schema = new mongoose.Schema(
  {
    _location: {
      // location needs to be defined like pointschema
      type: pointSchema,
      required: true,
    },
    _votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isDeparture: { type: Boolean },
    g_id: { type: String },
    g_name: { type: String },
    name: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)
// use the schema by instantiating a model

module.exports = mongoose.model('Location', schema)
