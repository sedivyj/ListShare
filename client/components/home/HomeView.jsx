import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import HomeSelectors from './HomeSelectors.jsx'
import NewList from './NewList.jsx'
import ReturnList from './ReturnList.jsx'

import { getAPI } from '../../utility/api-tools.js'

/**
 * View user first sees when coming to page
 * Gives option to create a list or return to a list
 * @returns React HomeView
 */
const HomeView = (props) => {
  const [isStarting, setIsStarting] = useState(false)
  const [isReturning, setIsReturning] = useState(false)

  // Effect for returning to Create List View
  // Clears inputs for the view
  useEffect(() => {
    props.setPassword('')
  }, [isStarting])

  // Effect for returning to Return List View
  // Clears inputs for the View
  useEffect(() => {
    props.setUUID('')
    props.setPassword('')
  }, [isReturning])

  const fetchUUID = useCallback(async () => {
    getAPI('/home/getID')
      .then((data) => props.setUUID(data.uuid))
      .catch((err) => console.log(err))
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
            uuid={props.uuid}
            password={props.password}
            setPassword={props.setPassword}
            setListData={props.setListData}
        />
        )}
        {(isReturning &&
          <ReturnList
            uuid={props.uuid}
            password={props.password}
            setUUID={props.setUUID}
            setPassword={props.setPassword}
            setListData={props.setListData}
          />
        )}
    </div>
    </div>
  )
}

HomeView.propTypes = {
  uuid: PropTypes.string,
  password: PropTypes.string,
  setUUID: PropTypes.func,
  setListData: PropTypes.func,
  setPassword: PropTypes.func
}

export default HomeView
