import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = ({ ifError }) => {
  const message = useSelector(state => state.notifications)
  console.log('NOTI', message)

  if (message === '') {
    return null
  } else if (ifError === true) {
    return <div className="container">
      {(message &&
      <Alert variant='warning'>{message}</Alert>)}
    </div>
  } else if (ifError === false) {
    return <div className="container">
      {(message &&
      <Alert variant='success'>{message}</Alert>)}
    </div>
  }
}

export default Notification