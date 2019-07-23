const bcrypt = require('bcrypt');
const Claim = require('../models/Claim');
const Business = require('../models/Business');

const initKeyGen = async (busId) => {
  let secretKey = generateSecretKey(busId);
  let exists = await checkSecretKey(busId, secretKey);

  while(exists) {
    secretKey = generateSecretKey(busId);
    exists = await checkSecretKey(busId, secretKey);
  }

  const encrypted = await bcrypt.hash(secretKey, 10)

  return {encrypted: encrypted, secret: secretKey};
}

const initBusinessIdGen = async () => {
  let businessId = generateBusinessId();
  let exists = await checkBusinessId(businessId);

  while(exists) {
    businessId = generateBusinessId();
    exists = await checkBusinessId(businessId);
  }

  return businessId;
}

const initClaimIdGen = async () => {
  let claimId = generateClaimId();
  let exists = await checkClaimId(claimId);

  while(exists) {
    claimId = generateClaimId();
    exists = await checkClaimId(claimId);
  }

  return claimId;
}

const generateAwsKey = () => {
  let range = "ACDEFGHJKLMNPQRSTUVWXYZ2345679";
  let secretKey = "";

  for(let i = 0; i < 8; i++)
    secretKey += range[Math.floor(Math.random() * (range.length))]

  return secretKey;
};

const generateSecretKey = (busId) => {
  let range = "ACDEFGHJKLMNPQRSTUVWXYZ2345679";
  let secretKey = "";

  for(let i = 0; i < 8; i++)
    secretKey += range[Math.floor(Math.random() * (range.length))]

  secretKey = `${secretKey}-${busId}`

  return secretKey;
};

const generateBusinessId = () => {
  let charArray = "ACDEFGHJKLMNPQRSTUVWXYZ";
  let numArray = "2345679";
  let businessId = "";

  for(let i = 0; i < 3; i++) // 3 Random Letters
    businessId += charArray[Math.floor(Math.random() * (charArray.length))]
    
  for(let i = 0; i < 3; i++) // 3 Random Numbers
    businessId += numArray[Math.floor(Math.random() * (numArray.length))]
  
  return businessId;
};

const generateClaimId = () => {
  let range = "ACDEFGHJKLMNPQRSTUVWXYZ2345679";
  let claimId = "";

  for(let i = 0; i < 8; i++)
    claimId += range[Math.floor(Math.random() * (range.length))]

  return claimId;
};

const checkSecretKey = async (busId, sk) => {
  const businessClaims = await Claim.find({businessId: busId});
  
  if (!businessClaims)
    return false;

  for (let claim of businessClaims) {
    if (bcrypt.compareSync(sk, claim.secretKey))
      return true;
  }

  return false;
}

const checkBusinessId = async (busId) => {
  const businesses = await Business.find({id: busId});
  
  if (!businesses)
    return false;

  for (let business of businesses) {
    if (business.id === busId)
      return true;
  }

  return false;
}

const checkClaimId = async (claimId) => {
  const claims = await Claim.find({id: claimId});
  
  if (!claims)
    return false;

  for (let claim of claims) {
    if (claims.id === claimId)
      return true;
  }

  return false;
}

module.exports = {
  initKeyGen,
  initBusinessIdGen,
  initClaimIdGen,
  generateAwsKey
};
