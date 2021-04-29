import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem.jsx'

function ListContainer (props) {
  // Add a new item to the list and update the DB
  const addListItem = (event) => {
    console.log('ADDED ITEM')
    const newItem = { data: 'New Item' }

    // Add to DB and when successful update UI

    props.setListData([...props.listData, newItem])
  }

  const deleteListItem = (listID) => {
    // Remove from DB and when successful update UI
    const listDataCopy = [...props.listData]
    listDataCopy.splice(listID, 1)

    props.setListData(listDataCopy)
  }

  return (
    <div>
      <button className='btn' onClick={addListItem}>Add Item</button>
      <ul className='list-group'>
        {props.listData.map((listItem, index) => {
          return (<ListItem
            key={index} listID={index}
            deleteListItem={deleteListItem}
            data={listItem}/>)
        })}
      </ul>
    </div>
  )
}

ListContainer.propTypes = {
  listData: PropTypes.array
}

export default ListContainer
