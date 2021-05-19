const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, index: { unique: true } },
  recipes: [
    Schema.Types.ObjectId,
  ],
  cart: [
    Schema.Types.ObjectId,
  ],
});

module.exports = userSchema;
