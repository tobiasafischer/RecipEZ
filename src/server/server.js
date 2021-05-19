/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const saveRecipe = require('../mongo/logic/recipe');
const { getRecipes } = require('../mongo/logic/user');
const { getCart, saveCart } = require('../mongo/logic/cart');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '../')));

const mongoDB = 'mongodb://localhost:27017/recipes';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error: '));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/recipe', (req, res) => {
  saveRecipe(req.body.json, req.body.username)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err) throw err;
      else res.sendStatus(500);
    });
});

app.get('/recipe', (req, res) => {
  getRecipes(req.query.username)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      if (err) throw err;
      else res.sendStatus(500);
    });
});

app.post('/cart', (req, res) => {
  saveCart(req.body.json, req.body.username)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err) throw err;
      else res.sendStatus(500);
    });
});

app.get('/cart', (req, res) => {
  getCart(req.query.username)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch(() => {
      res.sendStatus(501);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
