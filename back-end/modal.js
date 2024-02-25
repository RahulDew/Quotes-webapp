const mongoose = require("mongoose");

// creating a schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  quote: String,
});
// creating modal
const User = new mongoose.model("User", userSchema);

module.exports = User