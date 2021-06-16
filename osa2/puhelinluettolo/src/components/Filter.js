import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return(
    <form>
      <div>filter shown with 
        <input 
          value = {filter} onChange = {handleFilterChange}>
        </input>
      </div>
    </form>
  )
}

export default Filter