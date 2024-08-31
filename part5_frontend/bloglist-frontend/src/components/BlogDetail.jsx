import { useMatch } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setBlog } from '../reducers/blogReducer'

const BlogDetail = ( { blogs, putLikes, deleteBlog } ) => {
  const [newComment, setComment] = useState('')

  const dispatch = useDispatch()

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if(!blog){
    return <>Loading! Or there is not any blog for this user yet</>
  }

  const plusLike = () => {
    console.log('user id', blog)
    const id = blog.id
    const newObject = { ...blog, likes: blog.likes + 1 }
    putLikes(id, newObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Deleting ${blog.title}! Are you sure?`))
      deleteBlog(blog.id)
  }

  console.log('detail blog', blog)

  const creatComment = async (event) => {
    event.preventDefault()
    const commentCreate = {
      comment: newComment
    }
    const response = await blogService.commentCreat(blog.id, commentCreate)
    console.log('creat comment',response)
    const newComments = blog.comments.concat(response)
    const newBlog = { ...blog, comments: newComments }
    const newBlogs = blogs.map(b => b.id === blog.id ? newBlog : b)
    console.log('we have a new blog', newBlogs)
    dispatch(setBlog(newBlogs))
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
    console.log('what am i submitting?', event.target.value)
  }

  return (
    <div key={blog.id}>
      <h1>{blog.title}</h1>
      {blog.url}
      <br />
      <span id="likes-count">{blog.likes}</span>
      <button id="like-blog" onClick={plusLike}>
          like
      </button>
      <br />
      added by {blog.user ? blog.user.username : 'unkonwn user'}
      <br />
      <h2>Comments</h2>
      <form onSubmit={creatComment}>
        <div>
          <input
            value={newComment}
            onChange={handleCommentChange}
          />
        </div>
        <button type='submit'>add comment</button>
      </form>
      {blog.comments.map(comment =>
        <li key={comment.id}>{comment.comment}</li>
      )}
      <br />
      <button id="remove-blog" onClick={removeBlog}>
          remove
      </button>
    </div>
  )
}

export default BlogDetail