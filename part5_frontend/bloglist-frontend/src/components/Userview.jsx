import _ from 'lodash'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'


const Userview = ({ blogs }) => {

  console.log('ready to group',blogs)
  const groupedBlogs = _.groupBy(blogs, (blog) => blog.user.username)
  const pairedBlogs = _.toPairs(groupedBlogs)

  console.log('grouped blogs', pairedBlogs)

  const padding = {
    padding: 5
  }

  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {
            pairedBlogs.map(user => {
              return (
                <tr key={user[0]}>
                  <td>
                    <Link style={padding} to={`/users/${user[1][0].user.id}`}>{user[0]}</Link>
                  </td>
                  <td>
                    {user[1].length}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </>
  )
}

export default Userview