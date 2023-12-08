// server.js
const express = require('express');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const app = express();

 


app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});


app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
  });





app.listen(process.env.PORT , () => {
    mongoose 
    .connect(process.env.DB_URL)
    .then(()=> console.log(`Server is running on http://localhost:${process.env.PORT }`))
    .catch((err)=>console.log(err))
 
});
