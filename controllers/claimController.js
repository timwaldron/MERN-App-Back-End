const Claim = require('../models/Claim');

const createClaim = async() => {
  try {
    let newClaim = new Claim({
      claimID: "04SGNF",
      disclosureType: ["Harrasment", "Abuse"],
      actionedDate: "12/12/2019",
      lodgementDate: "11/12/2019",
      comments: ["Object", "Object", "Object", "Object"],
      status: "Open",
      claimData: ["Document1", "Document2"]
    });

    let savedClaim = await newClaim.save();
    console.log("Successfully create single recipe:", savedClaim);
  } catch (ex) { 
    console.log(ex);
  }
}

// const createSeedRecipe = async(amount) => {
//   console.log("createSeedRecipe function");
//   try {
//     // const recipeNames = ["Truffle", "Chocolate", "Fish", "Cat", "Dog", "Car", "Orange", "Yellow"];
//     // const newRecipe = new Recipe({ name: recipeNames[rand(0, recipeNames.length - 1)] });

//     if (amount === 1) {
//       let newRecipe = new Recipe({
//         name: "NAME",
//         description: "DESCRIPTION",
//         steps: ["1", "2", "3", "4", "5"],
//         ingredients: ["a", "b", "c", "d", "e"],
//       });
//       let savedRecipe = await newRecipe.save();
//       console.log("Successfully create single recipe:", savedRecipe);
//     } else {
//       for(let i = 0; i <= amount; i++) {
//         let newRecipe = new Recipe({
//           name: "NAME",
//           description: "DESCRIPTION",
//           steps: ["1", "2", "3", "4", "5"],
//           ingredients: ["a", "b", "c", "d", "e"],
//         });
//         await newRecipe.save();
//       }
//       console.log("Successfully created " + amount + " recipes");
//     }
//   } catch (ex) {
//     console.log("An internal server error has occured:\n\n", ex);
//     return { status: 503, error: "An internal server error has occured" };
//   }

//   return { status: 200 };
// }

// const seedOne = (req, res) => {
//   console.log("seedOne function");

//   // createSeedRecipe(1).then((result) => {
//   //   switch(result.status) {
//   //     case 200:
//   //       res.redirect(301, 'recipe/all');
//   //       break;

//   //     default:
//   //       res.status(result.status).json({ error: result.message });
//   //       break;
//   //   }
//   // });
//   const Faker = require('../utils/faker');
//   console.log("Faker data:", Faker.food.dish);
//   res.send(Faker.food.dish);
// }

// const seedMany = (req, res) => {
//   console.log("seedMany function");
//   const { amount } = req.params;

//   createSeedRecipe(amount).then((result) => {
//     switch(result.status) {
//       case 200:
//         res.redirect(301, 'recipe/all');
//         break;

//       default:
//         res.status(result.status).json({ error: result.message });
//         break;
//     }
//   });
// }

module.exports = {
  createClaim,
};
