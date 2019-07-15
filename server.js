const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
// const Recipe = require('./models/recipe');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
  if (err)
    console.log("Not connected to DB:", err);
  else
    console.log("Connected to MongoDB");
})

app.use(cookieParser())
app.use(require('./routes'));


app.listen(PORT, (error) => {
  if (error)
    console.log("Error starting server on port " + PORT, error);
  else
    console.log("Server is now listening on port " + PORT);
});
