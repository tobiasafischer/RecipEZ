/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const saveRecipe = require('../mongo/logic/recipe');
const { getRecipes, deleteCard } = require('../mongo/logic/user');
const { getCart, saveCart, deleteItem } = require('../mongo/logic/cart');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('build'));
let url = 'mongodb://localhost:27017/recipes';
if (process.env.NODE_ENV === 'production') {
  url = process.env.MONGODB_URI;
}
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error: '));

let API_KEY;
let API_ID;
if (process.env.NODE_ENV === 'production') {
  API_ID = process.env.API_ID;
  API_KEY = process.env.API_KEY;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.get('/all-recipes', (req, res) => {
  fetch(`https://api.edamam.com/search?q=${req.query.search}&app_id=${API_ID}&app_key=${API_KEY}`)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
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
      res.json(data);
    })
    .catch(() => {
      res.sendStatus(501);
    });
});

app.post('/delete-item', (req, res) => {
  console.log(req.body);
  deleteItem(req.body.username, req.body.recipe.sourceURL)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(501);
    });
});

app.post('/delete-card', (req, res) => {
  deleteCard(req.body.username, req.body.sourceURL)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(501);
    });
});

app.listen(process.env.PORT || port);
