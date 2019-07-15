const Business = require('../../models/Business')
// private endpoints go here
const currentUser = (req, res) => {
  //current admin user logic goes here
}

const createBusiness = async (req, res) => {
  const { businessID, businessName, abn } = req.body
  try {
    const newBus = await new Business({businessID, businessName, abn})
    const savedBus = await newBus.save();
    console.log(savedBus)
    res.status(200).send(savedBus)
  } catch (error) {
    res.status(503).send(error.message)
  }
}

const login = async (req, res) => {
  console.log("Admin Login:", req.body);
};

module.exports = {currentUser, login, createBusiness};
