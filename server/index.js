const express = require('express');
const path = require('path');
const port = 3001;

const App = express();
App.use(express.json());

App.get('/', (req, res) => {
  res.send('sup');
});

//List Questions - Params: product_id, page, count
App.get('/qa/questions', (req, res) => {
  console.log(req.query); //Access URL params
  console.log(req.body.params); //Access body params
  res.sendStatus(200);
});

//Answer List - Params: product_id  Query param: page, count
App.get('/qa/questions/:question_id/answers', (req, res) => {

});

//Add Question - Body params: body, name, email, product_id
App.post('/qa/questions', (req, res) => {

});

//Add Answer - Params: question_id  Body params: body, name, email, photos
App.post('/qa/questions/:question_id/answers', (req, res) => {

});

//Mark Question Helpful - Params: question_id
App.put('/qa/questions/:question_id/helpful', (req, res) => {

});

//Report Question - Params: question_id
App.put('/qa/questions/:question_id/report', (req, res) => {

});

//Mark Answer Helpful - Params: answer_id
App.put('/qa/answers/:answer_id/helpful', (req, res) => {

});

//Report Answer - Params: answer_id
App.put('/qa/answers/:answer_id/report', (req, res) => {

});

App.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});