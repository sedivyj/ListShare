import React from 'react'
import PropTypes from 'prop-types'

import ListContainer from './ListContainer.jsx'

/**
 * View for viewing or editing a list
 * @param {*} props
 * @returns
 */
function ListView (props) {
  const updateListName = (event) => {
    const newListName = event.target.value
    console.log(newListName)
  }

  const updateListItems = (listItems) => {
    // Copy entire list data object
    const listDataCopy = { ...props.listData }
    // Set the listItems of the copy to the new listItems
    listDataCopy.listItems = [...listItems]

    if (props.setListData) {
      props.setListData(listDataCopy)
    }
  }

  // Posts current state of list to server to be stored in DB
  const updateListToDB = () => {
    console.log('UPDATED')
  }

  // Deletes entire list from DB
  const deleteListFromDB = () => {
    console.log('DELETE')
  }

  return (
    <div>
      <h2>Edit List!</h2>
      <input type='text' className='name-input'
        value={props.listData.name}
        onChange={updateListName}
      />
      <p>UUID: {props.listData.uuid}</p>
      <button className='btn btn-success mr-2' onClick={updateListToDB}>Save List</button>
      <button className='btn btn-danger ml-2' onClick={deleteListFromDB}>Delete List</button>
      <ListContainer
        listItemData={props.listData.listItems}
        updateListItems={updateListItems}
        />
    </div>
  )
}

ListView.propTypes = {
  setListData: PropTypes.func,
  listData: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
    listItems: PropTypes.array
  })
}

export default ListView
