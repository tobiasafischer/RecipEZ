/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/save-recipe', (req, res) => {
  console.log(req.body);
  res.send('good');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
