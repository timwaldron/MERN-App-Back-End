const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const businessSchema = require('./businessSchema')
const Business = mongoose.model('business', businessSchema); 

const claimSchema = {
  businessID: { type: mongoose.Schema.Types.ObjectId, ref: 'business' },
  claimID: String,
  disclosureType: Array,
  actionedDate: String,
  lodgementDate: String,
  comments: Array,
  status: Array,
  claimData: Array
}



module.exports = mongoose.model('claim', claimSchema)
