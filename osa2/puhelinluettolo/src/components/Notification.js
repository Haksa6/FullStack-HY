import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if(message.includes('Del' || 'Infor' || 'Fail')){
    return(
      <div className ="deleted">
        {message}
      </div>
    )
  }
  return (
    <div className="added">
      {message}
    </div>
  )
}
export default Notification