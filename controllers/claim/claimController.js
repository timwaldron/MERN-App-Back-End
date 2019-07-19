const Claim = require('../../models/Claim');
const Business = require('../../models/Business')

const { initKeyGen } = require('../../utils/generateUtils')
const { checkHashMatch } = require('../../utils/authUtils')

const createClaim = async (req, res) => {
  console.log(req.body);
  console.log("-------------------------------");
  const { business_id, categories, answers, questions } = req.body;

  let newClaim = {response: undefined}
  let keys = {};

  try {
    newClaim = new Claim({
      id: "ABCD1234",          // <ABCD1234>
      businessId: business_id,       // <ABC001>
      disclosureLevel: "1",  // "0", "1", "2"
      categories: categories,
      questions: questions,
      details: answers,
      status: 0,
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
  await res.status(200).send({secretKey: keys.secret.split('-')[0], claimId: newClaim.id});
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
          const { businessId, categories, comments, details, timestamps, status, questions } = claim;
          return res.status(200).send({claimBusId: businessId, categories, comments, details, timestamps, status, questions });
        }
      }
      
      return res.status(401).send({status: "error", message: "Invalid Business ID or Secret Key" })
    }
  } catch (error) {
    res.status(503).send({status: "error", message: "An internal server error has occured"})
  }
};

const findClaim = async (req, res) => {
  const { id } = req.headers;
  console.log("Attempting to find claimId:", id);

  try {
    const foundClaim = await Claim.findOne({id: id})
    res.send(foundClaim)
  } catch (error) {
    res.send(error.message)
  }
};

const updatePriority = async (req, res) => {
  console.log(req.body);
  const { id, priority } = req.body;
  console.log("Attempting to update claim id", id, "to priority", priority);

  try {
    const claim = await Claim.findOne({ id: id });
    claim.priority = priority;
    claim.timestamps.updatedAt = Date().toString();
    const newClaim = await claim.save();
    return res.status(200).send(newClaim)
    
  } catch (error) {
    res.status(503).send(error.message)
  }
}

const updateStatus = async (req, res) => {
  console.log(req.body);
  const { id, status } = req.body;
  console.log("Attempting to update claim id", id, "to status", status);

  try {
    const claim = await Claim.findOne({ id: id });
    claim.status = status;
    claim.timestamps.updatedAt = Date().toString();
    const newClaim = await claim.save();
    return res.status(200).send(newClaim)
    
  } catch (error) {
    res.status(503).send(error.message)
  }
}

const addComment = async (req, res) => {
  const { id, comment } = req.body;
  try {
    const claim = await Claim.findOne({id: id})
    claim.comments.push({text: comment, timestamp: Date().toString()})
    const newClaim = await claim.save();
    return res.status(200).send(newClaim)
  } catch (error) {
    res.send(error.message)
  }
};

const getDashboardOpenClaims = async (req, res) => {
  try {
    let claims = await Claim.find({ status: { $ne: 3 } });
    let mutatedClaims = [];
    
    for (let claim of claims) {
      try {
        let business = await Business.findOne({ id: claim.businessId })

        mutatedClaims.push({
          id: claim.id,
          businessId: claim.businessId,
          businessName: business.name,
          status: claim.status,
          priority: claim.priority,
          date: claim.timestamps.createdAt,
        });

      } catch(error) {
        console.log("Caught an error while mapping over returned claims", claim.id, "\nError message:", error.message);
      }
    }
    
    res.status(200).send(mutatedClaims)
  } catch (error) {
    res.status(503).send(error.message)
  }
}

module.exports = {
  createClaim,
  login,
  findClaim,
  updatePriority,
  updateStatus,
  addComment,
  getDashboardOpenClaims,
};
