const express = require('express');
const path = require('path');
const port = 3001;

const App = express();
App.use(express.json());

App.get('/', (req, res) => {
  res.send('sup');
});

App.get('/questions')

App.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});