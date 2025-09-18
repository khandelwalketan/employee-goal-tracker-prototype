import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import {Routes,Route} from "react-router-dom";
import Signup from './components/signup/Signup';
import Signin from './components/signup/signin';
import SetEditGoal from './components/SetGoal/SetEditGoal';

import Selectyear from './components/SetGoal/Selectyear';
import Selectquarter from './components/SetGoal/Selectquarter';
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import About from './components/about/About';


function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
    
  },[]);
  return (
    <div>
    <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path="/about" element={<About />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/seg' element={<Selectyear/>}/>
        <Route path='/seq' element={<Selectquarter />}/>
        <Route path='/qseg' element={<SetEditGoal/>}/>


      </Routes>
    
      
      
    </div>
  )
}

export default App
