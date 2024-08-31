import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from '../reducers/usernameReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/loginReducer'
import { setPassword } from '../reducers/passwordReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ ifError }) => {

  const dispatch = useDispatch()

  const username = useSelector(state => state.usernames)
  const password = useSelector(state => state.passwords)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with :', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      console.log('The user now is: ', user)
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(showNotification(`Welcome! ${username}`))
    } catch (error) {
      ifError = true
      dispatch(showNotification('Wrong username or password'))
    }
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 4000)
  }

  return (
    <div>
      <h1>Login to application</h1>
      <Form onSubmit={handleLogin}>
        <Notification ifError={ifError} />
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
            id="username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
            id="password"
          />
        </Form.Group>
        <Button variant='primary' id="login-button" type="submit">
          Login
        </Button>
      </Form>
    </div>

  )
}

export default LoginForm