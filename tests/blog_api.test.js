const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  { 
    title: "My first post",
    author: "Matt Johnston",
    url: "www.blogs.com",
    likes: 3
  },
  {
    title: "Money and Banking",
    author: "Gerald Donkersgoed",
    url: "www.moneyandbanking.com",
    likes: 17
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a blog can be updated', async () => {
  const startingResponse = await api.get('/api/blogs');
  const blogToUpdate = startingResponse.body[0];
  const id = blogToUpdate._id;

  const updateInfo = {
    title: "Updated Post",
    author: "Updated author",
    url: "www.updatedurl.com",
    likes: 50
  }

  const endingResponse = await api
    .put(`/api/blogs/${id}`)
    .send(updateInfo)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  const updatedBlog = endingResponse.body;
  expect(updatedBlog.title).toBe(updateInfo.title);
});

test('a blog can be deleted', async () => {
  const startingResponse = await api.get('/api/blogs');
  const blogsAtStart = startingResponse.body;
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204);
  
  const endingResponse = await api.get('/api/blogs');
  const blogsAtEnd = endingResponse.body;
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

  const titles = blogsAtEnd.map(blog => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Beautiful Butterflies",
    author: "Sally Ogletree",
    url: "www.beautifulbutterflies.com",
    likes: 13
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length + 1);

  const titles = response.body.map(blog => blog.title);
  expect(titles).toContain('Beautiful Butterflies');
});

afterAll(() => {
  mongoose.connection.close();
});
