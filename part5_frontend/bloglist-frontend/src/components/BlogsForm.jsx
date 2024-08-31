import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogsForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleTitleChange = (event) => {
    //console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    //console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    //console.log(event.target.value)
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:{' '}</Form.Label>
          <Form.Control
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="put title here"
            id="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:{' '}</Form.Label>
          <Form.Control
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder="put author here"
            id="author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:{' '}</Form.Label>
          <Form.Control
            value={newUrl}
            onChange={handleUrlChange}
            placeholder="put url here"
            id="url"
          />
        </Form.Group>
        <Button variant='primary' id="add-new-blog" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

BlogsForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogsForm
