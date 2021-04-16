import React, { useState, useEffect, useCallback } from 'react'
import HomeSelectors from './HomeSelectors.jsx'
import NewList from './NewList.jsx'
import ReturnList from './ReturnList.jsx'

/**
 * View user first sees when coming to page
 * Gives option to create a list or return to a list
 * @returns React HomeView
 */
const HomeView = () => {
  const [uuid, setUUID] = useState('')
  const [password, setPassword] = useState('')
  const [isStarting, setIsStarting] = useState(false)
  const [isReturning, setIsReturning] = useState(false)

  const fetchUUID = useCallback(async () => {
    fetch('/home/getID', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => setUUID(data.uuid))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const startingList = () => {
    fetchUUID()
    setIsStarting(true)
    setIsReturning(false)
  }

  const returnList = () => {
    setIsReturning(true)
    setIsStarting(false)
  }

  return (
    <div>
      <h1>List Share Home</h1>
      <div>
        <HomeSelectors
          startingList={startingList}
          returnList={returnList}
        />
      </div>
      <div>
        {(isStarting &&
          <NewList
            uuid={uuid}
        />
        )}
        {(isReturning &&
          <ReturnList />
        )}
    </div>
    </div>
  )
}

export default HomeView
