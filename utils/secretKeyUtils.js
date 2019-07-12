const bcrypt = require('bcrypt');

const generateSecretKey = async () => {
  const saltRounds = 10
  const randomKey = Math.floor(Math.random * 9999999) + 1000000;
  const salted = await bcrypt.hash(randomKey, saltRounds)
  return salted
};

module.exports = { generateSecretKey };
