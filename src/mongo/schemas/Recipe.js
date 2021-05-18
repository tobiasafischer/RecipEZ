const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: String,
  calories: Number,
  healthValues: Object,
  image: String,
  ingredients: [
    String,
  ],
  source: String,
  sourceURL: { type: String, index: { unique: true } },
  quantity: Number,
});

module.exports = recipeSchema;
