import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
  const getList = async () => {
    // If password is not set, then we just want to view the list
    const url = (props.password.length) ? '/home/returnToEditList' : '/home/returnToViewList'
    // Post a UUID and Password to server
    const postData = {
      uuid: props.uuid,
      password: props.password
    }
    console.log(JSON.stringify(postData))
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    const result = await response.json()
    if (response.ok) {
      if (props.setListData) { props.setListData(result) }
    } else {
      window.alert(result.message)
    }
  }

  return (
    <div>
      <h2>Return List</h2>
      <input value={props.uuid} onChange={setUUID} type='text' placeholder='Unique ID'/>
      <input className='ml-2' value={props.password} onChange={setPassword} type='text' placeholder='Password'/>
      <button className='btn btn-success ml-2' onClick={getList}>Get My List!</button>
    </div>
  )
}

ReturnList.propTypes = {
  uuid: PropTypes.string,
  password: PropTypes.string,
  setUUID: PropTypes.func,
  setListData: PropTypes.func,
  setPassword: PropTypes.func
}

export default ReturnList
