const mongoose = require('mongoose');

const dataModelSchema = new mongoose.Schema(
  [
    {
      productID: NUMBER,
      questions: [
        {
          questionID: {type: NUMBER, required: 'true'},
          questionBody: STRING,
          date: DATE.now,
          askerName: STRING,
          helpfulness: {type: NUMBER, default: 0},
          reported: {type: BOOLEAN, default: 'false'},
          email: STRING,
          answers: [
            {
              answerID: {type: NUMBER, required: 'true'},
              answerBody: STRING,
              date: DATE.now,
              answerName: STRING,
              helpfulness: {type: NUMBER, default: 0},
              reported: {type: BOOLEAN, default: 'false'},
              email: STRING,
              photos: [
                {
                  photoID: {type: NUMBER, required: 'true'},
                  url: STRING
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

const dataModel = mongoose.model('dataModel', dataModelSchema);
export default dataModel;