import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
import Wow from 'components/Try'

import {
    BrowserRouter as Router
} from 'react-router-dom'
ReactDOM.render(
<Router>
    {/* <UserContextProvider> */}
        {/* <App /> */}
        <Wow/>
    {/* </UserContextProvider> */}
</Router>, 
document.getElementById('root')
)