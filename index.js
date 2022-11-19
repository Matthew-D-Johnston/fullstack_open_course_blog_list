require('dotenv').config();
const http = require('http');
const express = require('express');
const app = require('./app');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const blogsRouter = require('./controllers/blogs');

// const mongoURL = process.env.MONGODB_URI;
// mongoose.connect(mongoURL);

// app.use(cors());
// app.use(express.json());
// app.use('/api/blogs', blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
