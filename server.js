'use strict';

const express = require('express');
const bodyParser = requre('body-parser');

const app = express();

app.post('/', bodyParser.json(), (req, res) => {
  console.log('Hello, I\'m the server');

  return res.status(204).end();
})

app.listen(8080)