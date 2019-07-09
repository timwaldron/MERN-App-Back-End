const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const businessSchema = new Schema({
  businessID: String,
  businessName: String, 
  abn: String
})

module.exports = mongoose.model('business', businessSchema)
