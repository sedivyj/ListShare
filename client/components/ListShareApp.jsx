import React, { useState, useEffect } from 'react'
import HomeView from './home/HomeView.jsx'
import ListView from './list/ListView.jsx'

// Main application
function ListShareApp () {
  const [uuid, setUUID] = useState('')
  const [password, setPassword] = useState('')
  const [listData, setListData] = useState(null)

  return (
    <div className='container'>
      {(listData === null &&
        <HomeView
          uuid={uuid}
          password={password}
          setUUID={setUUID}
          setPassword={setPassword}
          setListData={setListData}
        />
      )}
      {(listData &&
        <ListView
          uuid={uuid}
          password={password}
          listData={listData}
          setListData={setListData}
        />
      )}
    </div>
  )
}

export default ListShareApp
