import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      ...newBlog,
      likes: 0,
    })
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input
            name="title"
            value={newBlog.title}
            onChange={event => setNewBlog({ ...newBlog, [event.target.name]: event.target.value })}
            required
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            name="author"
            value={newBlog.author}
            onChange={event => setNewBlog({ ...newBlog, [event.target.name]: event.target.value })}
            required
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            name="url"
            type="url"
            value={newBlog.url}
            onChange={event => setNewBlog({ ...newBlog, [event.target.name]: event.target.value })}
            required
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm