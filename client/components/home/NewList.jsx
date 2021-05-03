import React from 'react'
import PropTypes from 'prop-types'

import { putAPI } from '../../utility/api-tools.js'

// Component that displays option to create a list
function NewList (props) {
  // Post a UUID and Password to server
  const postUUID = async () => {
    if (props.password.length >= 8) {
      const postData = {
        uuid: props.uuid,
        password: props.password
      }

      putAPI('/home/createList', postData)
        .then((data) => {
          if (props.setListData) { props.setListData(data) }
        })
        .catch((err) => { window.alert(err.message) })
    } else {
      window.alert('You need a password at least 8 characters in length')
    }
  }

  const setPassword = (event) => {
    event.preventDefault()

    if (props.setPassword) {
      console.log(event.target.value)
      props.setPassword(event.target.value)
    }
  }

  return (
    <div className='mt-2'>
      <h3>{props.uuid}</h3>
      <p>Save this Identifier for later!</p>
      <input value={props.password} onChange={setPassword} className='mr-2' type='text' placeholder='Password'/>
      <button className='btn btn-success ml-2 mb-2' onClick={postUUID}>Start List!</button>
      <p>Input a password at least 8 characters long</p>
    </div>
  )
}

NewList.propTypes = {
  uuid: PropTypes.string,
  password: PropTypes.string,
  setListData: PropTypes.func,
  setPassword: PropTypes.func
}

export default NewList
