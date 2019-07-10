const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  businessID: { type: Schema.Types.ObjectId, ref: 'business' },
  claimID: String,
  disclosureType: Array,
  actionedDate: String,
  lodgementDate: String,
  comments: Array,
  status: Array,
  formData: Array,
  claimData: Array,
})



module.exports = mongoose.model('claim', claimSchema)
