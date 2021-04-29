import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function ListItem (props) {
  const deleteItem = (event) => {
    console.log(props.listID)
    if (props.deleteListItem) {
      props.deleteListItem(props.listID)
    }
    console.log('DELETE')
  }

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
      />
      <img className='float-right' src="./trash.svg" onClick={deleteItem}></img>
    </li>
  )
}

ListItem.propTypes = {
  data: PropTypes.string,
  listID: PropTypes.number,
  deleteListItem: PropTypes.func,
  editListItem: PropTypes.func
}

export default ListItem
