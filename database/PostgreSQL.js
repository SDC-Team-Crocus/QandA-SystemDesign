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

// async function connectionPool() {
//   const pool = new Pool(login);
//   await pool.connect();
//   const now = await pool.query("SELECT NOW()");
//   console.log(`Time: ${now.rows[0]["now"]}`);
//   await pool.end();
//   return now;
// }

// connectionPool();

async function insertUser () {
  const inserted = await pool.query("Insert into Users (UserName, Email) VALUES ($1, $2) ON CONFLICT DO NOTHING", ['Testname6', 'TestingEmail@y.com']);
};

async function getPhotos (answerID) {
  let photosContainer = [];
  const photosData = await pool.query("SELECT * FROM Photos WHERE AnswerID = $1", [answerID]);
  if (photosData.length) {
    for (let i = 0; i < photosData.row.length; i++) {
      photosContainer.push(photosData.row[i].photourl)
    }
  }
  console.log(photosContainer);
  return photosContainer;
};

async function getAnswers (questionID) {
  let answersContainer = {};
  const answersData = await pool.query("SELECT * FROM Answers INNER JOIN Users ON Answers.UserID = Users.UserID WHERE QuestionID = $1", [questionID]);
  if (answersData.length) {
    for (let i = 0; i < answersData.row.length; i++) {
      let currentRow = answersData.row[i];
      answersContainer[currentRow.answerid] = {
        id: currentRow.answerid,
        body: currentRow.answerbody,
        date: new Date(currentRow.currentdate).toISOString(),
        answerer_name: currentRow.username,
        helpfulness: currentRow.helpfulness,
        photos: getPhotos(currentRow.answerid)
      }
    }
  }
  console.log(answersContainer);
  return answersData;
};

async function getQuestions (productID, count=5, page=1) {
  let questionsContainer = [];
  const questionsData = await pool.query("SELECT * FROM Questions INNER JOIN Users ON Questions.UserID = Users.UserID WHERE ProductID = $1 LIMIT $2 OFFSET $3", [productID, count, (page-1)*count]);
  if (questionsData.length) {
    for (let i = 0; i < questionsData.row.length; i++) {
      let currentRow = questionsData.row[i];
      questionsContainer.push({
        question_id: currentRow.questionid,
        question_body: currentRow.questionbody,
        question_date: new Date(currentRow.currentdate).toISOString(),
        asker_name: currentRow.username,
        question_helpfulness: currentRow.helpfulness,
        reported: !!currentRow.reported,
        answers: getAnswers(currentRow.questionid)
      })
    }
  }
  console.log(questionsContainer);
  return questionsContainer;
};

getQuestions(71697)
.then(data => {console.log(data)})
.catch(e => {console.log(e)})
// getAnswers(252261);
// getPhotos(5);

//{productID, results: [questions data, answers: [answer data, photos: [photodata]]]}