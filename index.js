const express = require('express');
const path = require('path');
const port = 3001;

const App = express();
App.use(express.json());

App.get('/', (req, res) => {
  res.send('sup');
});

//List Questions - Params: product_id, page, count
App.get('/qa/questions')

//Answer List - Params: product_id  Query param: page, count
App.get('/qa/questions/:question_id/answers')

//Add Question - Body params: body, name, email, product_id
App.post('/qa/questions')

//Add Answer - Params: question_id  Body params: body, name, email, photos
App.post('/qa/questions/:question_id/answers')

//Mark Question Helpful - Params: question_id
App.put('/qa/questions/:question_id/helpful')

//Report Question - Params: question_id
App.put('/qa/questions/:question_id/report')

//Mark Answer Helpful - Params: answer_id
App.put('/qa/answers/:answer_id/helpful')

//Report Answer - Params: answer_id
App.put('/qa/answers/:answer_id/report')

App.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});