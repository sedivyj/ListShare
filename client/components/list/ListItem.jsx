import React from 'react'
import PropTypes from 'prop-types'

function ListItem (props) {
  const deleteItem = (event) => {
    console.log(props.listID)
    if (props.deleteListItem) {
      props.deleteListItem(props.listID)
    }
    console.log('DELETE')
  }

  return (
    <li className='list-group-item'>
      <p>List Item</p>
      <img src="./trash.svg" onClick={deleteItem}></img>
    </li>
  )
}

// ListItem.propTypes = {
//   data: PropTypes.string
// }

export default ListItem
