const mongoose = require('mongoose');
const moment = require('moment');

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true, default: '' },
  price: { type: Number, default: 0 },
  category: { type: String, default: '' },
  description: { type: String, default: '' },
  quantity: { type: Number, default: 0 },
  createdTimeStamp: {
    type: String,
    default: moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

module.exports = mongoose.model('products', ProductSchema);
