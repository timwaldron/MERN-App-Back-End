const Claim = require('../../models/Claim');
const { initKeyGen } = require('../../utils/secretKeyUtils')

const createClaim = async(req, res) => {
  console.log(req.body);
  console.log("-------------------------------");
  const { business_id, categories, answers } = req.body;

  let newClaim = {response: undefined}
  let keys = {};

  try {
    newClaim = new Claim({
      claimId: "ABCD1234",          // <ABCD1234>
      businessId: business_id,       // <ABC001>
      disclosureLevel: "1",  // "0", "1", "2"
      categories: categories,
      details: answers,
      status: "new",
      comments: [],
      attachments: [],
      confirmed: true,
      timestamps: {             // Timestamps
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        actionedAt: "undefined",
        closedAt: "undefined",
      },
    });
    keys = await initKeyGen(newClaim.businessId);
    newClaim.secretKey = keys.encrypted;
    let savedClaim = await newClaim.save();
    console.log("Successfully created new claim:", savedClaim);
  } catch (ex) { 
    console.log(ex);
  }
  await res.status(200).send({secretKey: keys.secret.split('-')[0]});
};

const findClaim = async (req, res) => {
  const { claimId } = req.body;
  console.log("REQ.Body:", req.body);
  try {
    const foundClaim = await Claim.findOne(claimId)
    res.send(foundClaim)
  } catch (error) {
    res.send(error.message)
  }
};

const login = async (req, res) => {
  const { businessId, secretKey } = req.body;
  console.log("businessId:", businessId);
  console.log("secretKey:", secretKey);
  console.log("req.body:", req.body);

  try {
    const foundClaim = await Claim.find({secretKey: secretKey, businessId: businessId});
    console.log("foundClaim:", foundClaim);
    res.status(200).send({status: 200, message: "Sucessfully found record for business " + foundClaim.businessId});
  } catch (error) {
    res.send(error.message)
  }
};

const addComment = async (req, res) => {
  const { claimId, comment } = req.body;
  try {
    const foundClaim = await Claim.findOne(claimId)
    const updatedClaim = await foundClaim.comment.push(comment)
    res.send(updatedClaim)
  } catch (error) {
    res.send(error.message)
  }
};

module.exports = {
  createClaim,
  findClaim,
  addComment,
  login,
};
