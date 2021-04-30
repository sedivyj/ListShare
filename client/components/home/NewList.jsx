import React from 'react'
import PropTypes from 'prop-types'

/*
TODO:
  Issue with uuid and password not being posted correctly
  Fix onChange for text input for password
*/
function NewList (props) {
  // Post a UUID and Password to server
  const postUUID = async () => {
    if (props.password.length >= 8) {
      const postData = {
        uuid: props.uuid,
        password: props.password
      }
      const response = await fetch('/home/createList', {
        method: 'PUT',
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
