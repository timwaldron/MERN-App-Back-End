const bcrypt = require('bcrypt');
const Claim = require('../models/Claim');
const Business = require('../models/Business');

const initKeyGen = async (busid) => {
  let secretKey = generateSecretKey(busid);
  let exists = await checkSecretKey(busid, secretKey);

  while(exists) {
    secretKey = generateSecretKey(busid);
    exists = await checkSecretKey(busid, secretKey);
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

const generateSecretKey = (busid) => {
  let range = "ACDEFGHJKLMNPQRSTUVWXYZ2345679";
  let secretKey = "";

  for(let i = 0; i < 8; i++) {
    secretKey += range[Math.floor(Math.random() * (range.length))]
  }
  secretKey = `${secretKey}-${busid}`

  return secretKey;
};

const generateBusinessId = () => {
  let charArray = "ACDEFGHJKLMNPQRSTUVWXYZ";
  let numArray = "2345679";
  let businessId = "";

  for(let i = 0; i < 3; i++) { // 3 Random Letters
    businessId += charArray[Math.floor(Math.random() * (charArray.length))]
  }
  for(let i = 0; i < 3; i++) { // 3 Random Numbers
    businessId += numArray[Math.floor(Math.random() * (numArray.length))]
  }
  
  return businessId;
};

const checkSecretKey = async (busid, sk) => {
  const businessClaims = await Claim.find({businessId: busid});
  
  if (!businessClaims)
    return false;

  for (let claim of businessClaims) {
    if (bcrypt.compareSync(sk, claim.secretKey)) {
        return true;
    }
  }

  return false;
}

const checkBusinessId = async (busid) => {
  const businesses = await Business.find({id: busid});
  
  if (!businesses)
    return false;

  for (let business of businesses) {
    if (business.id === busid)
      return true;
  }

  return false;
}

module.exports = {
  initKeyGen,
  initBusinessIdGen,
};
