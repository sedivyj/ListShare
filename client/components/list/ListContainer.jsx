import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem.jsx'

function ListContainer (props) {
  return (
    <div >
      <ul className='list-group'>
        {props.listData.map((listItem, index) => {
          return (<ListItem key={index} data={listItem}/>)
        })}
      </ul>
    </div>
  )
}

ListContainer.propTypes = {
  listData: PropTypes.array
}

export default ListContainer
