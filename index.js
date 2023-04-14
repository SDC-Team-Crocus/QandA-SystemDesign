const express = require('express');
const path = require('path');
const port = 3001;

const App = express();
express.json();

App.get('/', (req, res) => {
  res.send('sup');
});

App.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});