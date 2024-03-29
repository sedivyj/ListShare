import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { postAPI, deleteAPI } from '../../utility/api-tools.js'

// Header of List View. Displays relevant data about list
// and has options for saving/deleting list
function ListHeader (props) {
  const [lastSaved, setLastSaved] = useState(null)

  // Effect for last saved when listData changes
  useEffect(() => {
    // When first loading lets change it
    if (lastSaved === null) {
      setLastSaved('')
    } else if (lastSaved === '') { // any changes after first load require changing this
      const d = new Date()
      const timeString = `Last Saved: ${d.toLocaleDateString('en-US')} ${d.toLocaleTimeString('en-US')}`
      setLastSaved(timeString)
    }
  }, [props.listData])

  const updateListName = (event) => {
    const newListName = event.target.value // Get new value

    const listDataCopy = { ...props.listData } // Copy state
    listDataCopy.name = newListName // Set new name on copy
    props.setListData(listDataCopy) // Apply copy as new state
  }

  // Posts current state of list to server to be stored in DB
  const updateListToDB = () => {
    const postData = {
      uuid: props.listData.uuid,
      password: props.password,
      name: props.listData.name,
      listItems: props.listData.listItems
    }

    postAPI('/list/updateList', postData)
      .then((data) => {
        window.alert(data.message) // Inform user of success
        setLastSaved('') // reset the lastSaved
      })
      .catch((err) => window.alert(err.message))
    console.log('UPDATED')
  }

  // Deletes entire list from DB
  const deleteListFromDB = async () => {
    const warnOne = window.confirm('Are you sure you want to delete this list?')
    if (warnOne) {
      const warnLast = window.confirm('Are you REALLY sure you want to delete this list?\nYou cannot undo this!')
      if (warnLast) {
        const deleteData = {
          uuid: props.listData.uuid,
          password: props.password
        }

        deleteAPI('/list/deleteList', deleteData)
          .then((data) => {
            window.alert('Successfully deleted list')
            setLastSaved(null) // null for next list
            props.setListData(null) // null since list is gone
          })
          .catch((err) => window.alert(err.message))
      }
    }
  }

  return (
    <>
      <div className='col float-left'>
        <input type='text' className='name-input'
          disabled={!props.password.length}
          value={props.listData.name}
          onChange={updateListName}
        />
        <p><strong>UUID:</strong> {props.listData.uuid}</p>
      </div>
      {!props.password.length ||
        <div className='col'>
          <div className='float-right'>
            <button className='btn btn-success mr-2' onClick={updateListToDB}>Save List</button>
            <button className='btn btn-danger ml-2' onClick={deleteListFromDB}>Delete List</button>
            <p style={{ color: 'orangered' }}>{lastSaved}</p>
          </div>
        </div>
      }
      </>
  )
}

ListHeader.propTypes = {
  password: PropTypes.string,
  setListData: PropTypes.func,
  listData: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
    listItems: PropTypes.array
  })
}

export default ListHeader
