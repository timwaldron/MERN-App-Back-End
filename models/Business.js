const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const businessSchema = new Schema({
  id: String,
  name: String, 
  abn: String
})

module.exports = mongoose.model('business', businessSchema)
