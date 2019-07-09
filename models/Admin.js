const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: String,
  password: String
})

module.exports = mongoose.model('admin', adminSchema)
