// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// // Connect to MongoDB (you need to have MongoDB installed locally or use a cloud service)
mongoose.connect('mongodb+srv://QuizBuzz:Qbuzz123q@cluster0.zjafsoj.mongodb.net/quizbuzz', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(cors());
app.use(bodyParser.json());

// Define your routes here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
