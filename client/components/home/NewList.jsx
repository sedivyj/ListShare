import React, {useState, useEffect } from 'react'

function NewList (props) {

  // const postUUID = useCallback(async () => {
  //   // Post a UUID to server
  // })

  return (
    <div>
      <h2>{props.uuid}</h2>
      <p>Save this Identifier for later!</p>
      <input className='mr-2' type='text' placeholder='Password'/>
      <button className='btn btn-primary ml-2' onClick={props.getID}>Get ID</button>
    </div>
  )
}

export default NewList
