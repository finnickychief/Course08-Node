const mongoose = require('mongoose');
const moment = require('moment');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imgPath: { type: String, required: true },
  createdDate: {
    type: String,
    default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

module.exports = mongoose.model('products', ProductSchema);
