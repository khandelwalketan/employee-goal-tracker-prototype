import React from 'react'
import "./home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const move=()=>{
navigate('/seg');
  }
  return (
    <div className='home d-flex justify-content-center align-items-center'>
      <div className='container d-flex justify-content-center align-items-center flex-column'>
<h1 className='text-center'>Organize your <br/> work finally.</h1>
<p>Become focused,organized and calm with <br/> GOAL-SETTING APP.</p>
<button className='home-btn p-2' onClick={move}>Set/Edit Goals</button>
      </div>
    </div>
  )
}

export default Home
