import React from 'react'

import ListContainer from './ListContainer.jsx'

/**
 * View for viewing or editing a list
 * @param {*} props 
 * @returns 
 */
function ListView (props) {
  return (
    <div>
      <h2>List View!</h2>
      <p>UUID: {props.uuid}</p>
      <ListContainer
        listData={props.listData}
        setListData={props.setListData}
        />
    </div>
  )
}

export default ListView
