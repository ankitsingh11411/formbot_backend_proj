const mongoose = require('mongoose');

const responseSchema = mongoose.Schema(
  {
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    answers: [
      {
        elementId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Form.elements',
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
