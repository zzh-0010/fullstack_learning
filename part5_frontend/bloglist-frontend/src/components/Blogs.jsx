import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import Notification from './Notification'
import Blog from './Blog'
import Userview from './Userview'
import { setUser } from '../reducers/loginReducer'
import { setSortedBlog, setBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogsForm from './BlogsForm'
import blogService from '../services/blogs'
import { Routes, Route, Link } from 'react-router-dom'
import IndiviUserView from './IndiviUserView'
import BlogDetail from './BlogDetail'

import { Table, Navbar, Nav } from 'react-bootstrap'

const BlogsNow = ({ blogs, putLikes, deleteBlog, blogFromRef, createBlog }) => {
  return (
    <>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              putLikes={putLikes}
              deleteBlog={deleteBlog}
            />
          ))}
        </tbody>
      </Table>

      <Togglable buttonLable="new blog" ref={blogFromRef}>
        <BlogsForm createBlog={createBlog} />
      </Togglable>
    </>
  )
}

const Blogs = ({ ifError }) => {

  const blogFromRef = useRef()

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const user = useSelector(state => state.users)

  const handleLogout = (event) => {
    console.log('Logging out:', user.name)
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const putLikes = async (id, newObject) => {
    try {
      const response = await blogService.update(id, newObject)
      console.log('putlike response', response)
      const newBlogs = blogs.map((blog) => (blog.id === id ? response : blog))
      dispatch(setSortedBlog(newBlogs))
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const response = await blogService.remove(id)
      const newBlogs = blogs.filter((blog) => (blog.id === id ? '' : blog))
      dispatch(setBlog(newBlogs))
    } catch (error) {
      console.log(error.message)
    }
  }

  const createBlog = async (newObject) => {
    try {
      blogFromRef.current.toggleVisibility()
      const response = await blogService.create(newObject)
      console.log('blog response', response)
      dispatch(setBlog(blogs.concat(response)))
      console.log('Created...')
      ifError = false
      dispatch(showNotification(`Added ${response.title}`))
    } catch (error) {
      console.log(error.message)
    }
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 4000)
  }

  const padding = {
    padding: 5
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar >
      <h1>blogs</h1>
      <Notification ifError={ifError} />
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
      <Routes>
        <Route path='/users' element={<Userview blogs={blogs}/>}/>
        <Route path='/' element={<BlogsNow blogs={blogs} putLikes={putLikes} deleteBlog={deleteBlog}
          blogFromRef={blogFromRef} createBlog={createBlog}/>}/>
        <Route path='/users/:id' element={<IndiviUserView blogs={blogs}/>}/>
        <Route path='/blogs/:id' element={<BlogDetail blogs={blogs} putLikes={putLikes} deleteBlog={deleteBlog}/>}/>
      </Routes>
      <br />
    </>
  )
}

export default Blogs