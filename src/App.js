import React from 'react'
import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
// import ConversationsApp from './pages/ConversationsApp'
import Chat from './pages/Chat'
import Allchat from './pages/Allchat'



const App = () => {
  return (
    <Router>

      <Routes>

        {/* <Route path='/' element={<ConversationsApp/>}/> */}
        <Route path='/' element={<Chat/>}/>
        <Route path='/allchat' element={<Allchat/>}/>
      </Routes>
    </Router>
  )
}

export default App