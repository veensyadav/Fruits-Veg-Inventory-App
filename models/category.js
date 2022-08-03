const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Virtual for Category's URL
CategorySchema.virtual('url').get(function () {
  return '/category/' + this._id;
});

module.exports = model('Category', CategorySchema);
