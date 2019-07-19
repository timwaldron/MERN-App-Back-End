
const Business = require('../../models/Business')
const { initBusinessIdGen } = require('../../utils/generateUtils')

const createBusiness = async (req, res) => {
  
  const { businessName, abn } = req.body

  try {
    const newBus = await new Business({ id: await initBusinessIdGen(), name: businessName, abn })
    const savedBus = await newBus.save();
    console.log(savedBus)
    return res.status(200).send(savedBus)
  } catch (error) {
    console.log(error.message);
    return res.status(503).send({ status: "error", message: "An internal server error has occured" })
  }
}

const checkBusinessId = async (req, res) => {
  const { business_id } = req.headers;

  try {
    console.log("Searching for ", business_id);

    const businessIdExists = await Business.findOne({id: business_id});

    if (businessIdExists)
      return res.status(200).send({exists: true})
    else
      return res.status(200).send({exists: false})

  } catch (error) {
    return res.status(503).send({ status: "error", message: "An internal server error has occured" })
  }
}

const findBusinessName = async (req, res) => {
  const { id } = req.headers;
  console.log("findBusinessName headers", id)

  try {
    const business = await Business.findOne({ id: id });

    if (!business)
      return res.status(200).send({ name: undefined })

    console.log("Returning business name from", business);

    return res.status(200).send({ name: business.name });
  } catch (error) {
    return res.status(503).send({ status: "error", message: "An internal server error has occured" })
  }
}

module.exports = {
  createBusiness,
  checkBusinessId,
  findBusinessName,
}