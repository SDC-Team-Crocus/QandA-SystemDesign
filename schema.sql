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

  -- **CREATING TABLES BASED ON CSV DATA** --

  -- CREATE TABLE IF NOT EXISTS questionData(
  --   id INTEGER,
  --   product_id INTEGER,
  --   body TEXT,
  --   date_written BIGINT,
  --   asker_name VARCHAR(30),
  --   asker_email VARCHAR(40),
  --   reported INTEGER,
  --   helpful INTEGER
  -- );

  -- CREATE TABLE IF NOT EXISTS answerData(
  --   id INTEGER,
  --   question_id INTEGER,
  --   body TEXT,
  --   date_written BIGINT,
  --   answerer_name VARCHAR(30),
  --   answerer_email VARCHAR(40),
  --   reported INTEGER,
  --   helpful INTEGER
  -- );

  -- CREATE TABLE IF NOT EXISTS photosData(
  --   id INTEGER,
  --   answer_id INTEGER,
  --   url TEXT
  -- );

  -- **STEPS TO TRANSFER DATA** --

  -- COPY questionData FROM '/home/ubuntu/questions.csv' DELIMITER ',' CSV HEADER;

  -- COPY answers (answerid, questionid, answerbody, currentdate, answerer_name, answerer_email, reported, helpfulness) FROM '/home/ubuntu/answers.csv' DELIMITER ',' CSV HEADER;

  -- COPY photosData FROM '/home/ubuntu/answers_photos.csv' DELIMITER ',' CSV HEADER;

  -- **SEND DATA TO AWS INSTANC** --
  -- $scp -i ~/Documents/HackReactorSR/AWS-SDC/dbms.pem ~/Documents/HackReactorSR/atelier-dataset/questions.csv  ubuntu@AWSADDRESSHERE:/home/ubuntu
  -- $scp -i ~/Documents/HackReactorSR/AWS-SDC/dbms.pem ~/Documents/HackReactorSR/atelier-dataset/answers.csv  ubuntu@AWSADDRESSHERE:/home/ubuntu
  -- $scp -i ~/Documents/HackReactorSR/AWS-SDC/dbms.pem ~/Documents/HackReactorSR/atelier-dataset/answers_photos.csv  ubuntu@AWSADDRESSHERE:/home/ubuntu

  -- **TRANSFERRING DATA INTO DESIGNED SCHEMA** --

  -- INSERT INTO Products (ProductID) SELECT product_id FROM questionData ON CONFLICT (productid) DO NOTHING;
  -- INSERT INTO Users (UserName, Email) SELECT asker_name, asker_email FROM questionData ON CONFLICT (UserName) DO NOTHING;
  -- INSERT INTO Users (UserName, Email) SELECT answerer_name, answerer_email FROM answerData ON CONFLICT (UserName) DO NOTHING;

  INSERT INTO Questions (QuestionID, QuestionBody, CurrentDate, Helpfulness, Reported, UserID, ProductID) SELECT id, body, date_written, helpful, reported, (SELECT UserID FROM Users WHERE Users.UserName = questionData.asker_name) AS UserID, product_id FROM questionData;

  -- **ORIGINAL QUERY THAT WORKS ON LOCAL BUT NOT ON EC2 INSTANCE** --
  INSERT INTO Answers (answerid, answerBody, currentdate, helpfulness, reported, UserID, QuestionID)
  SELECT id, body, date_written, helpful, reported, (SELECT userid FROM Users WHERE users.UserName = answerdata.answerer_name), question_id FROM answerdata;

  -- **IMPROVED QUERY THAT WORKS ON EC2 INSTANCE** --
  INSERT INTO Answers (answerid, answerBody, currentdate, helpfulness, reported, UserID, QuestionID)
  SELECT c.id, c.body, c.date_written, c.helpful, c.reported, c.userid, c.question_id FROM (SELECT * FROM answerdata INNER JOIN users ON answerdata.answerer_name = users.username) c;

  INSERT INTO Photos (PhotoID, PhotoURL, AnswerID) SELECT id, url, (SELECT AnswerID FROM Answers WHERE Answers.AnswerID = photosData.answer_id) AS AnswerID FROM photosData;

  -- **IMPROVED QUERY DIDN'T GET TO TEST** --
  INSERT INTO Photos (PhotoID, PhotoURL, AnswerID) SELECT pa.id, pa.url, pa.answerid FROM (SELECT answers.answerid,  FROM answers INNER JOIN photosdata ON photosdata.answer_id = answers.answerid ON CONFLICT DO NOTHING) pa;

  -- **CREATING INDICES FOR TABLES** --
  CREATE INDEX productid_idx ON Questions(ProductID);
  CREATE INDEX answerid_idx ON Photos(AnswerID);
  CREATE INDEX userid_q_idx ON Questions(UserID);
  CREATE INDEX userid_a_idx ON Answers(UserID);
  CREATE INDEX questionid_idx ON Answers(QuestionID);
  CREATE INDEX username_idx ON Users(Username);

-- **FAILED QUERIES TO TRY TO UPDATE USERID COLUMN FOR ALL ROWS** --

-- UPDATE answers SET userid = (SELECT users.userid FROM users WHERE users.username = answers.answerer_name) WHERE answers.answerer_name IS NOT NULL;

-- UPDATE answers a SET userid = c.userid FROM
-- (SELECT u.userid, u.username FROM users) c WHERE a.answerer_name = c.username;

-- UPDATE answers SET userid = users.userid FROM users WHERE answers.answerer_name = users.username;

-- UPDATE answers a, users u SET a.userid = u.userid WHERE a.answerer_name = u.username;

-- UPDATE answers a SET userid = u.userid FROM users u WHERE u.username = a.answerer_name;

-- UPDATE answers SET userid = u.userid FROM (SELECT userid, username FROM users) AS u WHERE u.username = answers.answerer_name;