const express = require('express');
const path = require('path');
const port = 3001;
const { getQuestions } = require('../database/PostgreSQL');
const { getAnswers } = require('../database/PostgreSQL');

const App = express();
App.use(express.json());

// console.log(req.query); //Access URL params
// console.log(req.body.params); //Access body params

//List Questions - Params: product_id, page, count
App.get('/qa/questions', (req, res) => {
  getQuestions(parseInt(req.query.product_id), parseInt(req.query.count), parseInt(req.query.page), "questions")
  .then(data => {
    let returnedData = {product_id: req.query.product_id, results: data}
    res.send(returnedData)})
  .catch(err => res.sendStatus(404))
});

//Answer List - Params: product_id  Query param: page, count
App.get('/qa/questions/:question_id/answers', (req, res) => {
  getAnswers(parseInt(req.params.question_id), "answers", parseInt(req.query.count), parseInt(req.query.page))
  .then(data => {
    let returnedData = {question: req.params.question_id, page: req.query.page, count: req.query.count, results: data}
    res.send(returnedData)})
  .catch(err => res.sendStatus(404))
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