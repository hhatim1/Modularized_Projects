const mongoose = require('mongoose');

const SharkSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Shark = mongoose.model('Shark', SharkSchema);