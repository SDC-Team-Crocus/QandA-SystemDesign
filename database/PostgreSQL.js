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
  const photosData = await pool.query("SELECT * FROM Photos WHERE AnswerID = $1", [answerID])
  let photosContainer = [];
  for (let i = 0; i < photosData.rows.length; i++) {
    photosContainer.push(photosData.rows[i].photourl)
  }
  return photosContainer;
};

async function getAnswers (questionID) {
  const answersData = await pool.query("SELECT * FROM Answers INNER JOIN Users ON Answers.UserID = Users.UserID WHERE QuestionID = $1", [questionID])
    let answersContainer = {};
    for (let i = 0; i < answersData.rows.length; i++) {
      let currentRow = answersData.rows[i];
      let photosList = await getPhotos(currentRow.answerid);
      answersContainer[currentRow.answerid] = {
        id: currentRow.answerid,
        body: currentRow.answerbody,
        date: new Date(parseInt(currentRow.currentdate)).toISOString(),
        answerer_name: currentRow.username,
        helpfulness: currentRow.helpfulness,
        photos: photosList
      }
    }
    // console.log(answersContainer);
    return answersContainer;
};

async function getQuestions (productID, count, page) {
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
        let answersList = await getAnswers(currentRow.questionid);
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

module.exports.getQuestions = getQuestions;
// getQuestions(71725).then(data=>{console.log(data)})
// getAnswers(1).then(data=>{console.log(data)});
// getPhotos(5).then(data=>{console.log(data)});