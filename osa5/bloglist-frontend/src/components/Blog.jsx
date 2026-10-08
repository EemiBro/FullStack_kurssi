import { useState } from 'react'

const Blog = ({ blog, onLike, deleteBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    onLike(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} &nbsp;
        <button
          type="button"
          aria-expanded={showInfo}
          onClick={() => setShowInfo(current => !current)}
        >
          {showInfo ? 'Hide info' : 'Info'}
        </button>
      </div>

      {showInfo && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} &nbsp;
            <button type="button" onClick={handleLike}>
              Like
            </button>
          </p>
          <p>{blog.author}</p>
          <button type="button" onClick={() => deleteBlog(blog.id, blog.title)}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog