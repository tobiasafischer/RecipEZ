/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const recipeSchema = require('../schemas/Recipe');

const Recipes = mongoose.model('Recipes', recipeSchema);

const saveRecipe = (data) => {
  delete data.healthValues['SUGAR.added'];
  const recipe = new Recipes(data);
  return recipe.save()
    .then(() => 'success')
    .catch((err) => {
      if (err) throw err;
    });
};

module.exports = saveRecipe;
