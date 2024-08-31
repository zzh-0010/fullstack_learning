import _ from 'lodash'
import { useMatch } from 'react-router-dom'

const IndiviUserView = ( { blogs } ) => {

  console.log('what\'s in blogs? ', blogs)
  const groupedBlogs = _.groupBy(blogs, (blog) => blog.user.username)
  const pairedBlogs = _.toPairs(groupedBlogs)

  const match = useMatch('/users/:id')
  const user = match
    ? pairedBlogs.find( user => user[1][0].user.id === match.params.id)
    : null

  console.log('HEY', pairedBlogs)

  if(!user){
    return <>Loading...</>
  }

  console.log('what is user?', user)

  return (
    <>
      <h1>{user[0]}</h1>
      <h2>added blogs</h2>
      {user[1].map(blog =>
        <li key={blog.id}>{blog.title}</li>
      )}
    </>
  )
}

export default IndiviUserView