/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const userSchema = require('../schemas/User');
const recipeSchema = require('../schemas/Recipe');

const Recipes = mongoose.model('Recipes', recipeSchema);
const Users = mongoose.model('Users', userSchema);

const saveUser = (data) => {
  const user = new Users(data);
  return user.save()
    .then(() => 'success')
    .catch((err) => {
      if (err) throw err;
    });
};

const addRecipe = (sourceURL, username) => Recipes.find({ sourceURL })
  .then((recipe) => {
    Users.update({ username },
      {
        $push: {
          recipes: recipe,
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

const getRecipes = (username) => Users.find({ username })
  .then((user) => Recipes.find({
    _id: {
      $in: user[0].recipes,
    },
  })
    .then((data) => data))
  .catch((err) => {
    if (err) throw err;
  });

module.exports = { saveUser, addRecipe, getRecipes };
