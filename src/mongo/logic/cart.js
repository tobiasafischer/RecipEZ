/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const recipeSchema = require('../schemas/Recipe');
const userSchema = require('../schemas/User');

const Recipes = mongoose.model('Recipes', recipeSchema);
const Users = mongoose.model('Users', userSchema);

const saveCart = (recipe, username) => {
  delete recipe.healthValues['SUGAR.added'];
  return Recipes.findOneAndUpdate(
    { sourceURL: recipe.sourceURL }, { upsert: true },
  )
    .then((data) => {
      if (data) {
        Users.update({ username },
          {
            $push: {
              cart: data,
            },
          })
          .then(() => 'success')
          .catch((err) => {
            if (err) throw err;
          });
      } else {
        const newRecipe = new Recipes(recipe);
        newRecipe.save()
          .then(() => {
            Recipes.find({ sourceURL: recipe.sourceURL })
              .then((res) => {
                Users.update({ username },
                  {
                    $push: {
                      cart: res,
                    },
                  })
                  .then(() => 'success')
                  .catch((err) => {
                    if (err) throw err;
                  });
              })
              .catch((err) => {
                if (err) throw err;
              });
          });
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
};

const getCart = (username) => Users.find({ username })
  .then((user) => Recipes.find({
    _id: {
      $in: user[0].cart,
    },
  })
    .then((data) => data)
    .catch((err) => {
      if (err) throw err;
    }))
  .catch((err) => {
    if (err) throw err;
  });

const deleteItem = (username, sourceURL) => Recipes.find({ sourceURL })
  .then((recipe) => {
    Users.updateOne({ username }, {
      $pull: { cart: recipe[0]._id },
    })
      .then(() => {
      })
      .catch((err) => {
        if (err) throw err;
      });
  })
  .catch((err) => {
    if (err) throw err;
  });

module.exports = { saveCart, getCart, deleteItem };
