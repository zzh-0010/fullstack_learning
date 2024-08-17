import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogsForm = ( { createBlog } ) => {

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create New</h2>
        <div>
            title: <input
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='put title here'
            id='title'
          />
        </div>
        <div>
            author: <input
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='put author here'
            id='author'
          />
        </div>
        <div>
            url: <input
            value={newUrl}
            onChange={handleUrlChange}
            placeholder='put url here'
            id='url'
          />
        </div>
        <button id='add-new-blog' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogsForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogsForm