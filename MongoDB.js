const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/qanda');

const dataModelSchema = new Schema(
  [
    {
      productID: Number,
      questions: [
        {
          questionID: {type: Number, required: true},
          questionBody: String,
          date: Date.now,
          askerName: String,
          helpfulness: {type: Number, default: 0},
          reported: {type: Boolean, default: false},
          email: String,
          answers: [
            {
              answerID: {type: Number, required: true},
              answerBody: String,
              date: DATE.now,
              answerName: String,
              helpfulness: {type: Number, default: 0},
              reported: {type: Boolean, default: false},
              email: String,
              photos: [
                {
                  photoID: {type: Number, required: true},
                  url: String
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