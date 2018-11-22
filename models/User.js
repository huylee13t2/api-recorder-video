const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    max: 100,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6
  }
});

module.exports = mongoose.model("User", userSchema);