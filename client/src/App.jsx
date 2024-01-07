import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Login from './component/Login'
import Signup from './component/Signup'
import OurState from './context/ourState'





const App = () => {
  return (
    <>
    <OurState>
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
    </OurState>
    </>
  )
}

export default App