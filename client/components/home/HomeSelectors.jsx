import React from 'react'

const HomeSelectors = (props) => {
  return (
    <div>
      <button className='btn btn-primary mr-2' onClick={props.startingList}>Create a List</button>
      <button className='btn btn-primary ml-2' onClick={props.returnList}>Return to List</button>
    </div>
  )
}

export default HomeSelectors
