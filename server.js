// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { UserModel } = require('./models');
const jwt = require('jsonwebtoken');
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});



app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong! Please try again later.' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email, password });
    if (!user) throw new Error('User not found');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() =>
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    )
    .catch((err) => console.log(err));
});
