const bcrypt = require('bcrypt');
const Claim = require('../models/Claim');

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

const generateSecretKey = (busid) => {
  let range = "ACDEFGHJKLMNPQRSTUVWXYZ2345679";
  let secretKey = "";

  for(let i = 0; i < 8; i++) {
    secretKey += range[Math.floor(Math.random() * (range.length))]
  }
  secretKey = `${secretKey}-${busid}`

  return secretKey;
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

module.exports = { initKeyGen };
