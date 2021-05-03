import React from 'react'
import PropTypes from 'prop-types'

// Component that displays options for user to select
const HomeSelectors = (props) => {
  return (
    <div>
      <button className='btn btn-primary mr-2' onClick={props.startingList}>Create a List</button>
      <button className='btn btn-primary ml-2' onClick={props.returnList}>Return to List</button>
    </div>
  )
}

HomeSelectors.propTypes = {
  startingList: PropTypes.func,
  returnList: PropTypes.func
}

export default HomeSelectors
