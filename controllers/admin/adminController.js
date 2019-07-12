// private endpoints go here
const currentUser = (req, res) => {
  //current admin user logic goes here
}

const login = async (req, res) => {
  console.log("Admin Login:", req.body);
};

module.exports = {currentUser, login};
