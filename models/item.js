const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  numberInStock: { type: Number, required: true },
  image: { type: String, required: false },
});

// Virtual for Item's URL
ItemSchema.virtual('url').get(function () {
  return '/item/' + this._id;
});

module.exports = model('Item', ItemSchema);
