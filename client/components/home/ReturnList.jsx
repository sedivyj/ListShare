import React from 'react'
import PropTypes from 'prop-types'

import { postAPI } from '../../utility/api-tools.js'

const ReturnList = (props) => {
  const setUUID = (event) => {
    if (props.setUUID) {
      props.setUUID(event.target.value)
    }
  }

  const setPassword = (event) => {
    if (props.setPassword) {
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

    postAPI(url, postData)
      .then((data) => {
        if (props.setListData) {
          console.log(data)
          props.setListData(data)
        }
      })
      .catch((err) => {
        window.alert(err.message)
        // Clear inputs
        props.setPassword('')
        props.setUUID('')
      })
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
