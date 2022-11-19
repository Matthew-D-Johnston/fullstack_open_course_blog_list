const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes);
  return likesArray.reduce((sum, likes) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return blogs.sort((a, b) => b.likes - a.likes)[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};