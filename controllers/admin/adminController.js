const Admin = require('../../models/Admin');
const { checkPassword, generateAccessToken } = require('../../utils/authUtils.js');
const Business = require('../../models/Business')

const currentUser = (req, res) => {

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
  console.log("Attempting login\nreq.body:", req.body);

  try {
    const { email, password, jwt } = req.body;
    let account = await Admin.findOne({ email });

    if (!account)
      return res.status(401).send({ status: "error", message: "Invalid email or password" });

    let passwordMatch = await checkPassword(password, account.password);

    if (!passwordMatch)
      return res.status(401).send({ status: "error", message: "Invalid email or password" });
    else {
      res.cookie('token', generateAccessToken({ email: email, role: "admin" }), {httpOnly: false});
      return res.status(200).send({ status: "success", message: "Successfully logged in" });
    }

  } catch(ex) {
    return res.status(503).send({ status: "error", message: "An internal error has occured" });
  }
};

module.exports = {currentUser, login, createBusiness};
