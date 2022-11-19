require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');

const mongoURL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;
mongoose.connect(mongoURL);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;