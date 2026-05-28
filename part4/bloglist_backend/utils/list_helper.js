const dummy = (blogs) =>  {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let blogToReturn = blogs[0]
  let maxLikes = blogs[0].likes

  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      blogToReturn = blog
      maxLikes = blog.likes
    }
  })
  return blogToReturn
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const counts = {}

  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })

  let maxAuthor = null
  let maxBlogs = 0

  // Etsitään suurin
  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const counts = {}

  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes
  })

  let mostLikedAuthor = blogs[0].author
  let maxLikeAmount = blogs[0].likes 

  // Etsitään suurin
  for (const author in counts) {
    if (counts[author] > maxLikeAmount) {
      maxLikeAmount = counts[author]
      mostLikedAuthor = author
    }
  }

  return { author: mostLikedAuthor, likes: maxLikeAmount }
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }