import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const notificationTimeout = useRef(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const showNotification = (message, type) => {
    window.clearTimeout(notificationTimeout.current)
    setNotification({ message, type })
    notificationTimeout.current = window.setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  useEffect(() => () => window.clearTimeout(notificationTimeout.current), [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(currentBlogs => currentBlogs.concat(returnedBlog))
      showNotification(`Blog '${returnedBlog.title}' added`, 'success')
    } catch (error) {
      showNotification(error.response?.data?.error || 'could not save blog', 'error')
    }
  }

  const likeBlog = async id => {
    try {
      const likedBlog = await blogService.like(id)
      setBlogs(currentBlogs => currentBlogs.map(blog =>
        blog.id === id ? likedBlog : blog
      ))
    } catch (error) {
      showNotification(error.response?.data?.error || 'could not like blog', 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    showNotification('Logged out successfully', 'success')
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Welcome, ${user.name || user.username}!`, 'success')
    } catch (error) {
      if (error.response?.status === 401) {
        showNotification('wrong username or password', 'error')
      } else if (error.response) {
        showNotification(`login failed: server returned ${error.response.status}`, 'error')
      } else {
        showNotification('cannot reach the server; check that the backend is running on port 3003', 'error')
      }
    }
  }

  const deleteBlog = async (id, title) => {
    try {
      if (window.confirm(`Delete ${title}?`)) {
        await blogService.remove(id)
        setBlogs(currentBlogs => currentBlogs.filter(blog => blog.id !== id))
        showNotification(`Deleted ${title}`, 'success')
      }
    } catch (error) {
      showNotification(error.response?.data?.error || 'could not remove blog', 'error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification?.message} type={notification?.type} />

        {!user && loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification?.message} type={notification?.type} />

      {user && (
        <div>
          <div>
            <p>{user.name || user.username} logged in &nbsp;
              <button type="button" onClick={logout}>logout</button>
            </p>
          </div>
          <h2>create new</h2>
          {blogForm()}
        </div>
      )}

      {[...blogs].sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLike={likeBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App