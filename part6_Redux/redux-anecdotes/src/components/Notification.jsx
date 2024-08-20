import { useSelector,} from "react-redux"


const Notification = () => {
  const notification = useSelector(state => state.notifications)
  console.log("NOTI",notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notification === 'init') {
    return <div> </div>
  }
  else {
    return (
      <div style={style}>
        Voted {notification} !
      </div>
    )
  }


}

export default Notification