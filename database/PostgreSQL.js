const { Pool } = require('pg');

const login = {
  user: "",
  host: "localhost",
  database: "qanda",
  password: "",
  port: 5432 //Default psql port
}

const pool = new Pool(login);
pool.connect();

async function insertUser (name, email) {
  const inserted = await pool.query("Insert into Users (UserName, Email) VALUES ($1, $2) ON CONFLICT DO NOTHING", [name, email]);
};

async function getPhotos (answerID, method) {
  const photosData = await pool.query("SELECT * FROM Photos WHERE AnswerID = $1", [answerID])
  let photosContainer = [];
  if (method === "questions") {
    for (let i = 0; i < photosData.rows.length; i++) {
      photosContainer.push(photosData.rows[i].photourl)
    }
  } else if (method === "answers") {
    for (let i = 0; i < photosData.rows.length; i++) {
      photosContainer.push({
          id: photosData.rows[i].photoid,
          url: photosData.rows[i].photourl
        });
    }
  }
  return photosContainer;
};

async function getAnswers (questionID, method, count, page) {
  if (!count) {
    count = 100;
  }
  if (!page) {
    page = 1;
  }
  const answersData = await pool.query("SELECT * FROM Answers INNER JOIN Users ON Answers.UserID = Users.UserID WHERE QuestionID = $1 LIMIT $2 OFFSET $3", [questionID, count, (page-1)*count])
  if (method === "questions") {
    let answersContainer = {};
      for (let i = 0; i < answersData.rows.length; i++) {
        let currentRow = answersData.rows[i];
        let photosList = await getPhotos(currentRow.answerid, method);
        answersContainer[currentRow.answerid] = {
          id: currentRow.answerid,
          body: currentRow.answerbody,
          date: new Date(parseInt(currentRow.currentdate)).toISOString(),
          answerer_name: currentRow.username,
          helpfulness: currentRow.helpfulness,
          photos: photosList
        }
      }
      return answersContainer;
  } else if (method === "answers") {
    let answersContainer = [];
    for (let i = 0; i < answersData.rows.length; i++) {
      let currentRow = answersData.rows[i];
      let photosList = await getPhotos(currentRow.answerid, method);
      answersContainer.push({
        answer_id: currentRow.answerid,
        body: currentRow.answerbody,
        date: new Date(parseInt(currentRow.currentdate)).toISOString(),
        answerer_name: currentRow.username,
        helpfulness: currentRow.helpfulness,
        photos: photosList
      })
    }
    return answersContainer;
  }
};

async function getQuestions (productID, count, page, method) {
  if (!count) {
    count = 5;
  }
  if (!page) {
    page = 1;
  }
  const questionsData = await pool.query("SELECT * FROM Questions INNER JOIN Users ON Questions.UserID = Users.UserID WHERE ProductID = $1 LIMIT $2 OFFSET $3", [productID, count, (page-1)*count])
  let questionsContainer = [];
      for (let i = 0; i < questionsData.rows.length; i++) {
        let currentRow = questionsData.rows[i];
        let answersList = await getAnswers(currentRow.questionid, method);
        questionsContainer.push({
          question_id: currentRow.questionid,
          question_body: currentRow.questionbody,
          question_date: new Date(parseInt(currentRow.currentdate)).toISOString(),
          asker_name: currentRow.username,
          question_helpfulness: currentRow.helpfulness,
          reported: !!currentRow.reported,
          answers: answersList
        })
      }
  return questionsContainer;
};

async function postQuestion (body, name, email, productID) {
  await insertUser(name, email);
  return pool.query("INSERT INTO Questions (QuestionBody, UserID, ProductID, CurrentDate) VALUES ($1, (SELECT UserID FROM Users WHERE UserName = $2), $3, $4)", [body, name, productID, (new Date()).getTime()]);
}

module.exports.postQuestion = postQuestion;
module.exports.getQuestions = getQuestions;
module.exports.getAnswers = getAnswers;