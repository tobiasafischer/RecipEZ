const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  recipes: [
    Schema.Types.ObjectId,
  ],
});

module.exports = userSchema;
