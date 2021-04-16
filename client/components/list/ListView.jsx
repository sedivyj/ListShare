import React from 'react'

/**
 * View for viewing or editing a list
 * @param {*} props 
 * @returns 
 */
const ListView = (props) => {
  return (
    <div>
      <h2>List View!</h2>
      <p>UUID: {props.uuid}</p>
    </div>
  )
}

export default ListView
