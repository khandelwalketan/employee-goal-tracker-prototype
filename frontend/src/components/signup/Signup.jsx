import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const history=useNavigate();
  const [Inputs,setInputs]=useState(
    {"email":"",
      "username":"",
      "password":"",
    }

  );
  const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value});
  };
  const submit=async (e)=>{
    e.preventDefault();
    await axios.post("http://localhost:1000/api/v1/register",Inputs).then((Response)=>{
    alert(Response.data.message);
      setInputs(
        {"email":"",
          "username":"",
          "password":"",
        }
      );
      history('/signin');
    });
   
    
  };
  return (
    <div className='signup'>
      <div className='container'>
      <div className='row'>
      <div className='col-lg-8 d-flex justify-content-center align-items-center column'>
     <div className='d-flex  flex-column w-100 p-3'>
        <input className='p-2 my-3 input-signup' 
        type='email'
        name='email' 
        placeholder='Enter Your Email'
        onChange={change}
        value={Inputs.email}
        />
         <input className='p-2 my-3 input-signup' 
        type='username' 
        name='username' 
        placeholder='Enter Your Username'
        onChange={change}
        value={Inputs.username}

        />
         <input className='p-2 my-3 input-signup' 
        type='password' 
        name='password' 
        placeholder='Enter Your Password'
        onChange={change}
        value={Inputs.password}

        />
        <button className='btn-signup p-2' onClick={submit}>Sign up</button>
     </div>
      </div>
      <div className=' d-none col-lg-4 d-lg-flex justify-content-center align-items-center column col-left'>
      <h1 className='text-center sign-up-heading'>Sign <br/> Up</h1>
      </div>

      </div>

      </div>
    </div>
  )
}

export default Signup
