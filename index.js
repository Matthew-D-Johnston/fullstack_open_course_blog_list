const http = require('http');
const express = require('express');
const app = express();



app.get('/api/blogs', (request, response) => {
  // code to retrieve all blogs here
});

app.post('/api/blogs', (request, response) => {
  // code to create a blog post here
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});