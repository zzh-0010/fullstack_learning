import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentsService from '../services/comments'
import _ from 'lodash'

const blogSlice = createSlice({
  name:'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    setSortedBlog(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    }
  }
})

export const { setBlog, setSortedBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const comments = await commentsService.getAll()
    console.log(blogs)
    console.log('the comments are?',comments)
    const blogWithComment = blogs.map(blog => {
      const commentsDetail = blog.comments.map(commentId => _.find(comments, { id: commentId }))
      return { ...blog, comments: commentsDetail }
    })
    console.log('it is blogreducer', blogWithComment)
    dispatch(setSortedBlog(blogWithComment))
  }
}


export default blogSlice.reducer