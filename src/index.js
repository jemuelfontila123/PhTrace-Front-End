import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserContextProvider from './contexts/UserContextProvider'
import {
    BrowserRouter as Router
} from 'react-router-dom'
ReactDOM.render(
<Router>
    <UserContextProvider>
        <App />
    </UserContextProvider>
</Router>, 
document.getElementById('root')
)