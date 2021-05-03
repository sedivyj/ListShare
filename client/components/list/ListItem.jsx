import React from 'react'
import PropTypes from 'prop-types'

// Component that displays a single list item's data
// Provides opportunity to edit data
function ListItem (props) {
  // Deletes this item from state
  const deleteItem = (event) => {
    if (props.deleteListItem) {
      props.deleteListItem(props.listID)
    }
    console.log('DELETED')
  }

  // Edit data in this item
  const editItem = (event) => {
    event.preventDefault()
    const updatedListItem = { data: event.target.value }

    props.editListItem(props.listID, updatedListItem)
  }

  return (
    <li className='list-group-item'>
      <input type='text' className='list-input'
        value={props.data}
        onChange={editItem}
        disabled={!props.password.length}
      />
      {!props.password.length ||
        <img className='float-right' src="./trash.svg" onClick={deleteItem}></img>
      }
    </li>
  )
}

ListItem.propTypes = {
  password: PropTypes.string,
  data: PropTypes.string,
  listID: PropTypes.number,
  deleteListItem: PropTypes.func,
  editListItem: PropTypes.func
}

export default ListItem
