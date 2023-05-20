const { Pool } = require('pg');

const login = {
  user: "datauser",
  host: "172.31.23.130",
  database: "qanda",
  password: "sdc",
  port: 5432 //Default psql port
};

const pool = new Pool(login);
pool.connect();

//Adds new asker or answerer user
async function insertUser (name, email) {
  const inserted = await pool.query("INSERT INTO Users (UserName, Email) VALUES ($1, $2) ON CONFLICT DO NOTHING", [name, email]);
};

//Iterate through photos array and posts to database
async function insertPhotos (answerid, photos) {
  for (let i = 0; i < photos.length; i++) {
    await pool.query("INSERT INTO Photos (AnswerID, PhotoURL) VALUES ($1, $2)", [answerid, photos[i]]);
  }
}

/* ----------------- OBSOLETE DUE TO USING POSTGRES -------------------- */
//Get photos. 1 format for answers and another for questions
// async function getPhotos (answerID, method) {
//   const photosData = await pool.query("SELECT * FROM Photos WHERE AnswerID = $1", [answerID])
//   let photosContainer = [];
//   if (method === "questions") {
//     for (let i = 0; i < photosData.rows.length; i++) {
//       photosContainer.push(photosData.rows[i].photourl)
//     }
//   } else if (method === "answers") {
//     for (let i = 0; i < photosData.rows.length; i++) {
//       photosContainer.push({
//           id: photosData.rows[i].photoid,
//           url: photosData.rows[i].photourl
//         });
//     }
//   }
//   return photosContainer;
// };
/* ----------------- OBSOLETE DUE TO USING POSTGRES -------------------- */

//Gets answers for question id. 2 formats. 1 for when questions format is called and 1 for answer api format. Calls photos
async function getAnswers (questionID, count, page) {
  if (!count) {
    count = 100;
  }
  if (!page) {
    page = 1;
  }

  /* Fastest Method Using PostGreSql */
  const answersData = await pool.query(
    `SELECT COALESCE((SELECT json_agg(json_build_object(
        'answer_id', answers.answerid,
        'body', answers.answerbody,
        'date', TO_CHAR(TO_TIMESTAMP(answers.currentdate / 1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        'answerer_name', (SELECT username FROM users WHERE userid = answers.userid),
        'helpfulness', answers.helpfulness,
        'photos', COALESCE((SELECT json_agg(json_build_object('id', photos.photoid, 'url', photos.photourl)) FROM photos WHERE photos.answerID = answers.answerID), '[]')
      )) FROM answers WHERE answers.questionid = ${questionID} AND answers.reported = 0 LIMIT ${count} OFFSET ${(page-1)*count}), '[]')`
  )
return answersData.rows[0].coalesce;



 /* -------------------FAST BUT USES JAVASCRIPT----------------- */
//  let method = 'answers'
//   const answersData = await pool.query("SELECT * FROM Answers INNER JOIN Users ON Answers.UserID = Users.UserID WHERE QuestionID = $1 LIMIT $2 OFFSET $3", [questionID, count, (page-1)*count])
//   if (method === "questions") {
//     let answersContainer = {};
//       for (let i = 0; i < answersData.rows.length; i++) {
//         let currentRow = answersData.rows[i];
//         let photosList = await getPhotos(currentRow.answerid, method);
//         answersContainer[currentRow.answerid] = {
//           id: currentRow.answerid,
//           body: currentRow.answerbody,
//           date: new Date(parseInt(currentRow.currentdate)).toISOString(),
//           answerer_name: currentRow.username,
//           helpfulness: currentRow.helpfulness,
//           photos: photosList
//         }
//       }
//       return answersContainer;
//   } else if (method === "answers") {
//     let answersContainer = [];
//     for (let i = 0; i < answersData.rows.length; i++) {
//       let currentRow = answersData.rows[i];
//       let photosList = await getPhotos(currentRow.answerid, method);
//       answersContainer.push({
//         answer_id: currentRow.answerid,
//         body: currentRow.answerbody,
//         date: new Date(parseInt(currentRow.currentdate)).toISOString(),
//         answerer_name: currentRow.username,
//         helpfulness: currentRow.helpfulness,
//         photos: photosList
//       })
//     }
//     return answersContainer;
//   }
/* -------------------FAST BUT USES JAVASCRIPT----------------- */
};

//Gets all questions for product ids, calls for answers and photos as well
async function getQuestions (productID, count, page) {
  if (!count) {
    count = 5;
  }
  if (!page) {
    page = 1;
  }

  /* Fastest Method Using PostGreSql */
  const questionsData = await pool.query(
        `SELECT json_agg(json_build_object(
          'question_id', questions.questionid,
          'question_body', questions.questionbody,
          'question_date', TO_CHAR(TO_TIMESTAMP(questions.currentdate / 1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
          'asker_name', (SELECT username FROM users WHERE userid = questions.userid),
          'question_helpfulness', questions.helpfulness,
          'reported', questions.reported::int::boolean,
          'answers', COALESCE((SELECT (json_object_agg(answers.answerid, json_build_object(
            'id', answers.answerid,
            'body', answers.answerbody,
            'date', TO_CHAR(TO_TIMESTAMP(answers.currentdate / 1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
            'answerer_name', (SELECT username FROM users WHERE userid = answers.userid),
            'helpfulness', answers.helpfulness,
            'photos', COALESCE((SELECT json_agg(photos.photourl) FROM photos WHERE photos.answerID = answers.answerID), '[]')
          ))) FROM answers WHERE answers.questionid = questions.questionid AND answers.reported = 0), '{}')
          ))
          FROM questions WHERE productID = ${productID} AND questions.reported = 0 LIMIT ${count} OFFSET ${(page-1)*count}`
  )
  return questionsData.rows[0].json_agg;

/*--------------DO NOT USE. REALLY SLOW FORMAT---------------*/
  //   `SELECT json_build_object(
  //     'product_id', ${productID},
  //     'results', json_agg(
  //       json_build_object(
  //         'question_id', questions.questionid,
  //         'question_body', questions.questionbody,
  //         'question_date', questions.currentdate,
  //         'asker_name', questions.userid,
  //         'question_helpfulness', questions.helpfulness,
  //         'reported', questions.reported,
  //         'answers', answerList
  //       )
  //     )
  //   )
  //   FROM questions
  //   LEFT JOIN (
  //     SELECT answers.questionId, json_object_agg(
  //       answers.answerid, json_build_object(
  //         'id', answers.answerid,
  //         'body', answers.answerbody,
  //         'date', answers.currentdate,
  //         'answerer_name', answers.userid,
  //         'helpfulness', answers.helpfulness,
  //         'photos', photosList
  //       )
  //     ) AS answerList
  //     FROM answers
  //     LEFT JOIN (
  //       SELECT photos.answerid, json_agg(
  //           photos.photourl
  //       ) AS photosList
  //       FROM photos GROUP BY 1
  //       )
  //       photos ON photos.answerid = answers.answerid GROUP BY 1
  //       )
  //     answers ON answers.questionid = questions.questionid
  //     WHERE questions.ProductID = ${productID} LIMIT ${count} OFFSET ${(page-1)*count}`);

  // return questionsData.rows[0].json_build_object;
/*--------------DO NOT USE. REALLY SLOW FORMAT---------------*/


/* -------------------FAST BUT USES JAVASCRIPT----------------- */
  // const questionsData = await pool.query("SELECT * FROM Questions INNER JOIN Users ON Questions.UserID = Users.UserID WHERE ProductID = $1 LIMIT $2 OFFSET $3", [productID, count, (page-1)*count])
  // let questionsContainer = [];
  //     for (let i = 0; i < questionsData.rows.length; i++) {
  //       let currentRow = questionsData.rows[i];
  //       let answersList = await getAnswers(currentRow.questionid, method);
  //       questionsContainer.push({
  //         question_id: currentRow.questionid,
  //         question_body: currentRow.questionbody,
  //         question_date: new Date(parseInt(currentRow.currentdate)).toISOString(),
  //         asker_name: currentRow.username,
  //         question_helpfulness: currentRow.helpfulness,
  //         reported: !!currentRow.reported,
  //         answers: answersList
  //       })
  //     }
  // return questionsContainer;
/* -------------------FAST BUT USES JAVASCRIPT----------------- */
};

//Posts question to database
async function postQuestion (body, name, email, productID) {
  await insertUser(name, email);
  return pool.query("INSERT INTO Questions (QuestionBody, UserID, ProductID, CurrentDate) VALUES ($1, (SELECT UserID FROM Users WHERE UserName = $2), $3, $4)", [body, name, productID, (new Date()).getTime()]);
}

//Posts answer to database
async function postAnswer (body, name, email, questionID, photos) {
  await insertUser(name, email);
  return pool.query("INSERT INTO Answers (AnswerBody, UserID, QuestionID, CurrentDate) VALUES ($1, (SELECT UserID FROM Users WHERE UserName = $2), $3, $4) RETURNING AnswerID", [body, name, questionID, (new Date()).getTime()])
  .then(data => (insertPhotos(data.rows[0].answerid, photos)))
}

async function markHelpful (id, method) {
  if (method === "question") {
    return pool.query("UPDATE Questions SET Helpfulness = Helpfulness + 1 WHERE QuestionID = $1", [id])
  }
  if (method === "answer") {
    return pool.query("UPDATE Answers SET Helpfulness = Helpfulness + 1 WHERE AnswerID = $1", [id])
  }
}

async function report (id, method) {
  if (method === "question") {
    return pool.query("UPDATE Questions SET Reported = 1 WHERE QuestionID = $1", [id])
  }
  if (method === "answer") {
    return pool.query("UPDATE Answers SET Reported = 1 WHERE AnswerID = $1", [id])
  }
}

module.exports.getQuestions = getQuestions;
module.exports.postQuestion = postQuestion;
module.exports.getAnswers = getAnswers;
module.exports.postAnswer = postAnswer;
module.exports.markHelpful = markHelpful;
module.exports.report = report;
module.exports.pool = pool;