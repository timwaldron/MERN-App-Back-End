const Admin = require('../../models/Admin');
const Claim = require('../../models/Claim');
const Business = require('../../models/Business');

const { checkPassword, generateAccessToken } = require('../../utils/authUtils.js');

const showDashboard = async (req, res) => {
  try {
    const claims = await Claim.find({ status: { $ne: 3 } })
    res.status(200).send(claims)
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
      const token = generateAccessToken({ email: email, role: "admin" });
      console.log("The token for login is", token);
      res.cookie('token', token);
      return res.status(200).send({ status: "success", message: "Successfully logged in" });
    }

  } catch(ex) {
    return res.status(503).send({ status: "error", message: "An internal error has occured" });
  }
};

const logout = async (req, res) => {
  await res.clearCookie('token', { path: '/' });
  res.status(200).send({ success: true })
}

module.exports = {
  login,
  logout,
  showDashboard,
};
