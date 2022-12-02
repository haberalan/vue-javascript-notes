const mongoose = require('mongoose');

const User = require('./userModel');

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
    },
    text: {
      type: String,
      minLength: 0,
      maxLength: 255,
    },
    user_id: {
      type: String,
      ref: User,
      required: true,
    },
  },
  { timestamps: true }
);

notesSchema.statics.createOne = async function (title, text, user_id) {
  if (!title || !text) {
    throw Error('All fields must be filled!');
  }

  const enteredTitle = title.trim();
  const enteredText = text.trim();

  if (!enteredTitle || !enteredText) {
    throw Error('All fields must be filled!');
  }

  const note = await this.create({
    title: enteredTitle,
    text: enteredText,
    user_id,
  });

  return note;
};

notesSchema.statics.updateOne = async function (title, text, note_id, user_id) {
  if (!title || !text) {
    throw Error('All fields must be filled!');
  }

  const enteredTitle = title.trim();
  const enteredText = text.trim();

  if (!enteredTitle || !enteredText) {
    throw Error('All fields must be filled!');
  }

  const note = await this.findOneAndUpdate(
    { _id: note_id, user_id },
    {
      title: enteredTitle,
      text: enteredText,
    }
  );

  return note;
};

notesSchema.statics.deleteOne = async function (note_id, user_id) {
  const note = await this.findOneAndRemove({ _id: note_id, user_id });

  return note;
};

module.exports = mongoose.model('Notes', notesSchema);
