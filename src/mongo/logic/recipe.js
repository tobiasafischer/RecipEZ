/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const recipeSchema = require('../schemas/Recipe');
const { addRecipe } = require('./user');

const Recipes = mongoose.model('Recipes', recipeSchema);
const saveRecipe = (data, username) => {
  delete data.healthValues['SUGAR.added'];
  const recipe = new Recipes(data);
  return recipe.save()
    .then(() => {
      addRecipe(data.sourceURL, username)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err) throw err;
        });
    })
    .catch((err) => {
      if (err) throw err;
    });
};

module.exports = saveRecipe;
