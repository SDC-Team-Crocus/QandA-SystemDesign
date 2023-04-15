const mongoose = require('mongoose');

const dataModelSchema = new mongoose.Schema({
  [
    {
      productID: NUMBER,
      questions: [
        {
          questionID: NUMBER,
          questionBody: STRING,
          date: DATE.now,
          askerName: STRING,
          helpfulness: {type: NUMBER, default: 0},
          reported: {type: BOOLEAN, default: 'false'},
          email: STRING,
          answers: [
            {
              answerID: NUMBER,
              answerBody: STRING,
              date: DATE.now,
              answerName: STRING,
              helpfulness: {type: NUMBER, default: 0},
              reported: {type: BOOLEAN, default: 'false'},
              email: STRING,
              photos: [
                {
                  photoID: NUMBER,
                  url: STRING
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

export const dataModel = mongoose.model('dataModel', dataModelSchema);