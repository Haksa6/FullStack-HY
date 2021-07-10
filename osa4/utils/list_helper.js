const { toPairs } = require('lodash');
const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum += blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return null
  }

  const reducer = (currLargest, prevLargest) => {
    return (currLargest.likes > prevLargest.likes) ? currLargest : prevLargest
  }

  const favorite = blogs.reduce(reducer, 0)
  return{
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {

  if(blogs.length === 0){
    return null
  }
  
  const authorArray = _.map(blogs, 'author')
  const mostCommonAuthor = _.chain(authorArray)
    .countBy()
    .toPairs()
    .max(_.last)
    .head()
    .value()
  
  const amountOfBlogs = _.chain(authorArray)
  .countBy()
  .toPairs()
  .max(_.last)
  .last()
  .value()

  return{
    author: mostCommonAuthor,
    blogs: amountOfBlogs
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return null
  }
  
  const authorList = blogs.reduce((op, {author, likes}) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op
  }, {})

  const mostLikedAuthor = Object.keys(authorList).sort((a,b) => 
  authorList[b] - authorList[a])[0]

  return{
    author: mostLikedAuthor,
    likes: authorList[mostLikedAuthor]
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}