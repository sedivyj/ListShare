import React, {useState, useEffect, useCallback } from 'react'

/*
TODO:
  Issue with uuid and password not being posted correctly
  Fix onChange for text input for password
*/
function NewList (props) {
  // Post a UUID and Password to server
  const postUUID = async () => {
    const postData = {
      uuid: props.uuid,
      password: props.password
    }
    console.log(JSON.stringify(postData))
    fetch('/home/createList', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        props.setListData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const setPassword = (event) => {
    event.preventDefault()

    if (props.setPassword) {
      console.log(event.target.value)
      props.setPassword(event.target.value)
    }
  }

  return (
    <div>
      <h2>{props.uuid}</h2>
      <p>Save this Identifier for later!</p>
      <input value={props.password} onChange={setPassword} className='mr-2' type='text' placeholder='Password'/>
      <button className='btn btn-primary ml-2' onClick={postUUID}>Start List!</button>
    </div>
  )
}

export default NewList
