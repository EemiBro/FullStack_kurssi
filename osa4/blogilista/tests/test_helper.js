const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Sample Blog Post',
    author: 'John Doe',
    url: 'https://example.com/sample-blog-post',
    likes: 5,
  },
  {
    title: 'new blog',
    author: 'Eemeli',
    url: 'https://www.google.com/',
    likes: 10000,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}