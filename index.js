const express = require('express');
const path = require('path');
const port = 3001;

const App = express();

App.listen(port, () => {
  console.log(`Listening to port: ${port}`);
})