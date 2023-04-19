-- CREATE DATABASE QandA;

-- USE QandA;

CREATE TABLE IF NOT EXISTS Products(
  ProductID SERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Users(
  UserID SERIAL NOT NULL PRIMARY KEY,
  UserName VARCHAR(30) NOT NULL,
  Email VARCHAR(40) NOT NULL,
  CONSTRAINT name_unique UNIQUE (UserName)
);

CREATE TABLE IF NOT EXISTS Questions(
  QuestionID SERIAL NOT NULL PRIMARY KEY,
  QuestionBody TEXT NOT NULL,
  CurrentDate BIGINT NOT NULL,
  Helpfulness SERIAL NOT NULL,
  Reported SMALLINT NOT NULL DEFAULT 0,
  UserID INTEGER REFERENCES Users(UserID),
  ProductID INTEGER REFERENCES Products(ProductID)
);

CREATE TABLE IF NOT EXISTS Answers(
  AnswerID SERIAL NOT NULL PRIMARY KEY,
  AnswerBody TEXT NOT NULL,
  UserID INTEGER NOT NULL,
  CurrentDate BIGINT NOT NULL,
  Helpfulness SERIAL NOT NULL,
  Reported SMALLINT NOT NULL DEFAULT 0,
  UserID INTEGER REFERENCES Users(UserID),
  QuestionID INTEGER REFERENCES Questions(QuestionID)
);

CREATE TABLE IF NOT EXISTS Photos(
  PhotoID SERIAL NOT NULL PRIMARY KEY,
  PhotoURL VARCHAR(255) NOT NULL,
  AnswerID INTEGER REFERENCES Answers(AnswerID)
);

  -- CONSTRAINT fk_QuestionID
  --   FOREIGN KEY (QuestionID)
  --   REFERENCES Questions(QuestionID)

  -- INSERT INTO Questions (QuestionID, QuestionBody, CurrentDate, Helpfulness, Reported, UserID, ProductID)
  -- SELECT id, body, date, helpful, reported, (SELECT UserID FROM Users WHERE Users.UserName = questionData.asker_name) AS UserID, product_id FROM questionData;

  -- INSERT INTO Answers (AnswerID, AnswerBody, CurrentDate, Helpfulness, Reported, UserID, QuestionID)
  -- SELECT id, body, date_written, helpful, reported, (SELECT UserID FROM Users WHERE Users.UserName = answerData.answerer_name) AS UserID, question_id FROM answerData;

  -- INSERT INTO Photos (PhotoID, PhotoURL, AnswerID)
  -- SELECT id, url, (SELECT AnswerID FROM Answers WHERE Answers.AnswerID = photosData.answer_id) AS AnswerID FROM photosData;