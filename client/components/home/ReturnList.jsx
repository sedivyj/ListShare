import React, { useState, useEffect } from 'react'

const ReturnList = (props) => {
  const setUUID = (event) => {
    if (props.setUUID) {
      // console.log(event.target.value)
      props.setUUID(event.target.value)
    }
  }

  const setPassword = (event) => {
    if (props.setPassword) {
      // console.log(event.target.value)
      props.setPassword(event.target.value)
    }
  }

  // Submit inputted creds and see if a list returns
  const getList = () => {
    // If password is not set, then we just want to view the list
    const url = (props.password.length) ? '/home/returnToEditList' : '/home/returnToViewList'
    // Post a UUID and Password to server
    const postData = {
      uuid: props.uuid,
      password: props.password
    }
    console.log(JSON.stringify(postData))
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('SUCCESS')
        console.log(data)
        if (data && props.setListData) { props.setListData(data) }
      })
      .catch((err) => {
        console.log('ERR')
        console.log(err)
      })
  }

  return (
    <div>
      <h2>Return List</h2>
      <input value={props.uuid} onChange={setUUID} type='text' placeholder='Unique ID'/>
      <input value={props.password} onChange={setPassword} type='text' placeholder='Password'/>
      <button onClick={getList}>Get My List!</button>
    </div>
  )
}

export default ReturnList
