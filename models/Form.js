const mongoose = require('mongoose');

const formSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      required: true,
    },
    elements: [
      {
        type: {
          type: String,
          enum: ['text', 'image', 'video', 'gif', 'input'],
          required: true,
        },
        label: String,
        placeholder: String,
        required: Boolean,
        inputType: {
          type: String,
          enum: [
            'text',
            'number',
            'email',
            'phone',
            'date',
            'ratings',
            'button',
          ],
        },
        options: [String],
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
