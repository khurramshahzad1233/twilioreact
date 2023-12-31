import React from 'react'
import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
import ConversationsApp from './pages/ConversationsApp'



const App = () => {
  return (
    <Router>

      <Routes>

        <Route path='/' element={<ConversationsApp/>}/>
      </Routes>
    </Router>
  )
}

export default App