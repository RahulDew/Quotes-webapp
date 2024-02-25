const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./modal"); //getting user module from modal.js file

// handling mongoose connection error
main().catch((err) => console.log(err));

async function main() {
  // connecting to database
  await mongoose.connect("mongodb://127.0.0.1:27017/demo");
  console.log("DataBase is Connected...");
}

//initilizing app with express
const app = express();
//usiing middlewere
app.use(cors());

app.use(bodyParser.json());
PORT = 8080;

app.get("/quotes", async (req, res) => {
  const docs = await User.find({});
  // const filterquotes
  const filterquotes = docs.map((doc) => {
    return {
      _id: doc._id,
      username: doc.username,
      email: doc.email,
      quote: doc.quote,
    };
  });
  console.log("Filter kr diya hu");
  console.log(filterquotes);
  res.send(filterquotes); //sending doc to frontend
});

app.post("/register", async (req, res) => {
  try {
    //encrypting password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User();
    user.username = req.body.username;
    user.password = encryptedPassword;
    user.email = req.body.email;
    const doc = await user.save();
    res.status(200).json({ status: "ok" });
    console.log(doc);
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "error", error: "Duplicate Email!" });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", user: "Invalid Login" });
  }

  // validating and comparing user entered password with stored encrypted password
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    //signing or creating a token of username and email // with key ("Secretjs()123") which is a random string
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      "Secretjs()123"
    );

    console.log(req.body);
    console.log("bhai mil gya!");

    return res.json({ status: "ok", user: token });
  } else {
    res.json({ status: "error", user: false });
  }
});

app.get("/quote", async (req, res) => {
  // get token from frontend headers
  const token = req.headers["x-access-token"];

  try {
    // verify token with key ("Secretjs()123") which is randomly used for creating token
    const decodedToken = jwt.verify(token, "Secretjs()123");
    const email = decodedToken.email;
    const user = await User.findOne({ email: email });
    return res.json({
      status: "ok",
      quote: user.quote,
      username: user.username,
    });
  } catch (err) {
    console.log("Error is:", err);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decodedToken = jwt.verify(token, "Secretjs()123");
    const email = decodedToken.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log("Error is:", err);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Your server is ready at http://localhost:${PORT}`);
});
