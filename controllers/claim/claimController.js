const Claim = require('../../models/Claim');
const Business = require('../../models/Business')

const { initKeyGen } = require('../../utils/generateUtils')
const { checkHashMatch } = require('../../utils/authUtils')

const createClaim = async (req, res) => {
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
    newClaim.secretKey = await keys.encrypted;
    let savedClaim = await newClaim.save();
    console.log("Successfully created new claim:", savedClaim);
  } 
  catch (error) { 
    console.log('Error creating claim: ', error.message);
  }
  await res.status(200).send({secretKey: keys.secret.split('-')[0]});
};

const findClaim = async (req, res) => {
  const { claimId } = req.headers;
  console.log("Attempting to find claimId:", req.headers);
  try {
    const foundClaim = await Claim.findOne({id: claimId})
    res.send(foundClaim)
  } catch (error) {
    res.send(error.message)
  }
};

const login = async (req, res) => {
  try {
    const { businessId, secretKey } = req.body;
    
    const foundClaims = await Claim.find({businessId: businessId});

    if (!foundClaims || foundClaims.length === 0)
      return res.status(401).send({status: "error", message: "Invalid Business ID or Secret Key"});
    else {
      for (let claim of foundClaims) {
        let match = await checkHashMatch(`${secretKey}-${businessId}`, claim.secretKey);
        
        if (match) {
          const { businessId, categories, comments, details, timestamps, status } = claim;
          return res.status(200).send({claimBusId: businessId, categories, comments, details, timestamps, status });
        }
      }
      
      return res.status(401).send({status: "error", message: "Invalid Business ID or Secret Key" })
    }
  } catch (error) {
    res.status(503).send({status: "error", message: "An internal server error has occured"})
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
