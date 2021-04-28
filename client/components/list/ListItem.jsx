import React from 'react'
import PropTypes from 'prop-types'

function ListItem (props) {
  return (
    <li className='list-group-item'>
      <p>List Item</p>
    </li>
  )
}

ListItem.propTypes = {
  data: PropTypes.string
}

export default ListItem
