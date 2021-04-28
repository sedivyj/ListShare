import React from 'react'

import ListContainer from './ListContainer.jsx'

/**
 * View for viewing or editing a list
 * @param {*} props 
 * @returns 
 */
function ListView (props) {
  // Add a new item to the list and update the DB
  const addListItem = (event) => {
    console.log('ADDED ITEM')
    const newItem = { data: 'New Item' }

    props.setListData([...props.listData, newItem])
  }

  return (
    <div>
      <h2>List View!</h2>
      <p>UUID: {props.uuid}</p>
      <button onClick={addListItem}>Add Item</button>
      <ListContainer listData={props.listData}/>
    </div>
  )
}

export default ListView
