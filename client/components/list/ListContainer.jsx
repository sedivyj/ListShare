import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem.jsx'

function ListContainer (props) {
  // Add a new item to the list and update the DB
  const addListItem = (event) => {
    console.log('ADDED ITEM')
    const newItem = { data: 'New Item' }

    // Add to DB and when successful update UI
    props.updateListItems([...props.listItemData, newItem])
  }

  const deleteListItem = (listID) => {
    // Ask if user wants to delete this
    const wantsDelete = window.confirm(`Are you sure you want to delete ${props.listItemData[listID]?.data }?`)

    if (wantsDelete) {
      // Remove from DB and when successful update UI
      const listDataCopy = [...props.listItemData]
      listDataCopy.splice(listID, 1)

      props.updateListItems(listDataCopy)
    }
  }

  const editListItem = (listID, val) => {
    // Copy list
    const listDataCopy = [...props.listItemData]
    // Update the value
    listDataCopy[listID] = val

    props.updateListItems([...listDataCopy])
  }

  return (
    <div className='col'>
      <button className='btn btn-primary m-2' onClick={addListItem}>Add Item</button>
      <ul className='list-group flex-fill'>
        {props.listItemData.map((listItem, index) => {
          return (<ListItem
            key={index} listID={index}
            data={listItem.data}
            deleteListItem={deleteListItem}
            editListItem={editListItem}/>)
        })}
      </ul>
    </div>
  )
}

ListContainer.propTypes = {
  listItemData: PropTypes.array,
  updateListItems: PropTypes.func
}

export default ListContainer
