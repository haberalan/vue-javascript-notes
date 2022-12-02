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

userSchema.statics.updateData = async function (user_id, password, newPassword) {
  if (!password || !newPassword) {
    throw Error('All fields must be filled!');
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error('Password is not strong enough!');
  }

  const user = await this.findById(user_id);

  if (!user) {
    throw Error('There was an error!');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error('Incorrect password!');
  }

  const isUpdatedPasswordSame = await bcrypt.compare(newPassword, user.password);

  if (isUpdatedPasswordSame) {
    throw Error('New passwords must be different!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const updatedUser = await this.findByIdAndUpdate(user_id, { password: hashedPassword });

  return updatedUser;
};

userSchema.statics.deleteUser = async function (user_id, password) {
  if (!password) {
    throw Error('All fields must be filled!');
  }

  const user = await this.findById(user_id);

  if (!user) {
    throw Error('There was an error!');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error('Incorrect password!');
  }

  const deletedUser = await this.findByIdAndDelete(user_id);

  return deletedUser;
};

module.exports = mongoose.model('User', userSchema);
