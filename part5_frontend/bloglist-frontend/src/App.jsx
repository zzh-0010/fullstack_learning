import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


let ifError = false

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFromRef = useRef()

  const sortBlogs = (unsortedblogs) => {
    const sortedBlogs = unsortedblogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll()
      sortBlogs(blogs)
    }
    getAllBlogs()
  }, [])

  //检查本地登录信息存储
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      console.log('The user now is: ', user)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with :',username, password)
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log('The user now is: ', user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      ifError = true
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      },4000)
    }
  }

  const handleLogout = (event) => {
    console.log('Logging out:', user.name)
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const createBlog = async (newObject) => {
    try{
      blogFromRef.current.toggleVisibility()
      const response = await blogService.create(newObject)
      console.log('blog response',response)
      setBlogs(blogs.concat(response))
      console.log('Created...')
      ifError = false
      setMessage(`Added ${response.title}`)
    }
    catch (error) {
      console.log(error.message)
    }
    setTimeout(() => {
      setMessage(null)
    },4000)
  }

  const putLikes = async (id, newObject) => {
    try {
      const response = await blogService.update(id, newObject)
      console.log('putlike response', response)
      const newBlogs = blogs.map(blog => blog.id === id ? response : blog)
      sortBlogs(newBlogs)
    }
    catch (error){
      console.log(error.message)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h1>Login to application</h1>
        <Notification message={message} ifError={ifError}/>
        <div>
        username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
        password
          <input
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            id='password'
          />
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    )
  }

  const blogsForm = () => {
    return (
      <div>
        <h1>blogs</h1>
        <Notification message={message} ifError={ifError}/>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
        <br />
        <div>
          <Togglable buttonLable="new blog" ref={blogFromRef}>
            <BlogsForm createBlog={createBlog}/>
          </Togglable>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} putLikes={putLikes} deleteBlog={deleteBlog}/>
        )}
      </div>
    )
  }

  const deleteBlog = async(id) => {
    try {
      const response = await blogService.remove(id)
      const newBlogs = blogs.filter(blog => blog.id === id ? '' : blog)
      setBlogs(newBlogs)
    }catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      {user === null
        ? loginForm() :
        <div>
          {blogsForm()}
        </div>}
    </div>
  )
}

export default App