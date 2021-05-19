const mongoose = require('mongoose');
const userSchema = require('../schemas/User');

const Users = mongoose.model('Users', userSchema);
const saveCart = (recipe, username) => Users.update({ username },
  {
    $push: {
      cart: recipe[0],
    },
  })
  .then(() => 'success')
  .catch((err) => {
    if (err) throw err;
  });

const getCart = (username) => Users.find({ username })
  .then((user) => user.cart)
  .catch((err) => {
    if (err) throw err;
  });

module.exports = { saveCart, getCart };
