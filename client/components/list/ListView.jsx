import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ListHeader from './ListHeader.jsx'
import ListContainer from './ListContainer.jsx'

/**
 * View for viewing or editing a list
 */
function ListView (props) {
  const updateListItems = (listItems) => {
    // Copy entire list data object
    const listDataCopy = { ...props.listData }
    // Set the listItems of the copy to the new listItems
    listDataCopy.listItems = [...listItems]

    if (props.setListData) {
      props.setListData(listDataCopy)
    }
  }

  return (
    <div>
      <h2>{(props.password.length) ? 'Edit List!' : 'Visit List'}</h2>
      <div className='row'>
        <ListHeader
          password={props.password}
          listData={props.listData}
          setListData={props.setListData}
        />
      </div>
      <div className='row'>
        <ListContainer
          password={props.password}
          listItemData={props.listData.listItems}
          updateListItems={updateListItems}
          />
      </div>
    </div>
  )
}

ListView.propTypes = {
  password: PropTypes.string,
  setListData: PropTypes.func,
  listData: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
    listItems: PropTypes.array
  })
}

export default ListView
