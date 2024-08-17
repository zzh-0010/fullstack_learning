

const Notification = ({ message, ifError }) => {
  if(message === null){
    return null
  }
  else if(ifError === true){
    return (
      <div className='fail'>
        {message}
      </div>
    )
  }
  else if(ifError === false){
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

export default Notification