const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 100,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled!');
  }

  const enteredUsername = username.trim().toLowerCase();

  if (!enteredUsername) {
    throw Error('All fields must be filled!');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough!');
  }

  const usernameExists = await this.findOne({ username: enteredUsername });

  if (usernameExists) {
    throw Error('Username is already in use!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    username: enteredUsername,
    password: hashedPassword,
  });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled!');
  }

  const enteredUsername = username.trim().toLowerCase();

  if (!enteredUsername) {
    throw Error('All fields must be filled!');
  }

  const user = await this.findOne({ username: enteredUsername });

  if (!user) {
    throw Error('Incorrect username!');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error('Incorrect password!');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
