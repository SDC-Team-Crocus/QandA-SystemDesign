const express = require('express');
const path = require('path');
const port = 3001;
const { getQuestions, getAnswers, postQuestion, postAnswer, markHelpful, report } = require('../database/PostgreSQL');

const App = express();
App.use(express.json());

// console.log(req.query); //Access URL params
// console.log(req.body.params); //Access body params

//List Questions - Params: product_id, page, count
App.get('/qa/questions', (req, res) => {
  getQuestions(parseInt(req.query.product_id), parseInt(req.query.count), parseInt(req.query.page))
  .then(data => {
    let returnedData = {product_id: req.query.product_id, results: data}
    res.status(200).send(returnedData)})
  .catch(err => {res.sendStatus(404)});
});

//Answer List - Params: question_id  Query param: page, count
App.get('/qa/questions/:question_id/answers', (req, res) => {
  getAnswers(parseInt(req.params.question_id), parseInt(req.query.count), parseInt(req.query.page))
  .then(data => {
    let returnedData = {question: req.params.question_id, page: req.query.page || 0, count: req.query.count || 5, results: data}
    res.status(200).send(returnedData)})
  .catch(err => {res.sendStatus(404)});
});

//Add Question - Body params: body, name, email, product_id
App.post('/qa/questions', (req, res) => {
  postQuestion(req.body.body, req.body.name, req.body.email, req.body.product_id)
  .then(data => {res.sendStatus(201)})
  .catch(err => {res.sendStatus(404)});
});

//Add Answer - Params: question_id  Body params: body, name, email, photos
App.post('/qa/questions/:question_id/answers', (req, res) => {
  postAnswer(req.body.body, req.body.name, req.body.email, parseInt(req.params.question_id), req.body.photos)
  .then(data => {res.sendStatus(201)})
  .catch(err => {res.sendStatus(501)});
});

//Mark Question Helpful - Params: question_id
App.put('/qa/questions/:question_id/helpful', (req, res) => {
  markHelpful(parseInt(req.params.question_id), "question")
  .then(data => {res.sendStatus(204)})
  .catch(err => {res.sendStatus(501)});
});

//Report Question - Params: question_id
App.put('/qa/questions/:question_id/report', (req, res) => {
  report(parseInt(req.params.question_id), "question")
  .then(data => {res.sendStatus(204)})
  .catch(err => {res.sendStatus(501)});
});

//Mark Answer Helpful - Params: answer_id
App.put('/qa/answers/:answer_id/helpful', (req, res) => {
  markHelpful(parseInt(req.params.answer_id), "answer")
  .then(data => {res.sendStatus(204)})
  .catch(err => {res.sendStatus(501)});
});

//Report Answer - Params: answer_id
App.put('/qa/answers/:answer_id/report', (req, res) => {
  report(parseInt(req.params.answer_id), "answer")
  .then(data => {res.sendStatus(204)})
  .catch(err => {res.sendStatus(501)});
});

App.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

module.exports = App;