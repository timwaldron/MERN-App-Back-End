const Admin = require('../models/Admin')
const Business = require('../models/Business')
const Claim = require('../models/Claim')
const { initBusinessIdGen, initKeyGen, initClaimIdGen } = require('./generateUtils')

const businesses = [
  {
    name: 'Coder Academy',
    abn: '123123123'
  },
  {
    name: 'Westpac',
    abn: '321321321'
  },
  {
    name: 'KPMG',
    abn: '456456456'
  },
  {
    name: 'National Australia Bank',
    abn: '654654654'
  }
]

const seedBusiness = async (business) => {
  let savedBusiness;
  try {
    const newBusiness = await new Business({ id: await initBusinessIdGen(), name: business.name, abn: business.abn })
    savedBusiness = await newBusiness.save();
  }
  catch (error) {
    console.log('Error seeding business: ', error.message)
  }
  finally {
    if (savedBusiness) {
      return savedBusiness
    }
  }
}

const seedClaim = async (business) => {
  let savedClaim;
  let secretKey = await initKeyGen(business.id);
  let { encrypted, secret } = secretKey;
  try {
    console.log(`Seeding Claim for Business: ${business.id} / ${business.name} / SECRET KEY: ${secret}`)
    const newClaim = await new Claim({
      id: await initClaimIdGen(),
      businessId: business.id,
      disclosureLevel: "1",
      categories: { misconduct: true, health: true, influence: true },
      details: {
        answer_1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_5: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_6: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_7: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_8: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_9: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_10: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_11: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_12: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_13: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_14: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_15: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_16: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        answer_17: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
          'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
          'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
          'sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      status: "new",
      comments: [],
      attachments: [],
      confirmed: true,
      timestamps: {
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        actionedAt: "undefined",
        closedAt: "undefined",
      },
      secretKey: encrypted,
    })
    savedClaim = await newClaim.save()
    // console.log(savedClaim);
  }
  catch (error) {
    console.log('Error seeding claim: ', error.message);
  }
  finally {
    if (savedClaim) {
      return savedClaim;
    }
  }
}

const seedData = async () => {
  // delete previous entries 
  console.log('Deleting all previous businesses and claims...')
  await Business.deleteMany();
  await Claim.deleteMany();

  // iterate through business array and add them to the database
  for (let business of businesses) {
    console.log(`Seeding Business - ${business.name}`);
    let newBusiness = await seedBusiness(business);
    // adds a number of claims to that one business we generate
    for (let i = 0; i < 4; i++) {
      await seedClaim(newBusiness);
    }
  }
}

module.exports = {
  seedData
}
