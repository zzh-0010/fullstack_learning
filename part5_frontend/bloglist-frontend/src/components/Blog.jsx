import { useState } from 'react'

const Blog = ({ blog,  putLikes, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const plusLike = () => {
    console.log('user id',blog)
    const id = blog.id
    const newObject = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    putLikes(id, newObject)
  }

  const removeBlog = () => {
    if(window.confirm(`Deleting ${blog.title}! Are you sure?`))
      deleteBlog(blog.id)
  }

  console.log('Blog' ,blog)

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button id='show-blog-detail' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='showDetail'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/>
        <span id='likes-count'>{blog.likes}</span><button id='like-blog' onClick={plusLike}>like</button>
        <br/>
        {blog.user ? blog.user.username : 'unkonwn user'}
        <br/>
        <button id='remove-blog' onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}




export default Blog