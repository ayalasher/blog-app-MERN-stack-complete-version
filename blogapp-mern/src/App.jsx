import React from "react"
import Header from "./components/Header"
import {Route, Routes} from 'react-router-dom'
import Home from "./components/Home"
import Addblog from "./components/Add-blog"


function App() {


  return <div>
    <Header/>

    {/* routes and route are features of react-router-dom */}
    <Routes>
      <Route exact path="/" element={<Home/>}  />
      <Route  path="/addblog" element={<Addblog/>} />
    </Routes>
  </div>
}

export default App
