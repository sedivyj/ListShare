import React from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem.jsx'

function ListContainer (props) {
  // Add a new item to the list and update the DB
  const addListItem = (event) => {
    console.log('ADDED ITEM')
    const newItem = { data: 'New Item' }

    // Set state with elements of current state and append new item
    props.updateListItems([...props.listItemData, newItem])
  }

  const deleteListItem = (listID) => {
    // Ask if user wants to delete this
    const wantsDelete = window.confirm(`Are you sure you want to delete ${props.listItemData[listID]?.data}?`)

    if (wantsDelete) {
      const listDataCopy = [...props.listItemData] // Copy current state
      listDataCopy.splice(listID, 1) // slice out selected item

      // Set state with updated copy
      props.updateListItems(listDataCopy)
    }
  }

  const editListItem = (listID, val) => {
    const listDataCopy = [...props.listItemData] // Copy list
    listDataCopy[listID] = val // Update the value at index

    // Set state with updated copy
    props.updateListItems([...listDataCopy])
  }

  return (
    <div className='col'>
      {!props.password.length ||
        <button className='btn btn-primary m-2' onClick={addListItem}>Add Item</button>
      }
      <ul className='list-group flex-fill'>
        {props.listItemData.map((listItem, index) => {
          return (<ListItem
            key={index} listID={index}
            password={props.password}
            data={listItem.data}
            deleteListItem={deleteListItem}
            editListItem={editListItem}/>)
        })}
      </ul>
    </div>
  )
}

ListContainer.propTypes = {
  password: PropTypes.string,
  listItemData: PropTypes.array,
  updateListItems: PropTypes.func
}

export default ListContainer
