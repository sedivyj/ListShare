import React from 'react'
import ReactDom from 'react-dom'

import ListShareApp from './components/ListShareApp.jsx'

// Take over the root div and render our app
ReactDom.render(
  <ListShareApp/>,
  document.getElementById('root')
)
