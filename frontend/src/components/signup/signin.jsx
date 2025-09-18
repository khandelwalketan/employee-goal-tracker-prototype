import React, { useState } from 'react';
import './signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';


function Signin() {
  const dispatch=useDispatch();
  const history=useNavigate();

  const [Inputs,setInputs]=useState(
    {"email":"",
      "password":"",
    }

  );
  const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value});
  };
 const submit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:1000/api/v1/signin", Inputs);

    if (response.data.others) {
      sessionStorage.setItem("id", response.data.others._id);
      dispatch(authActions.login());
      history("/seg");
    } else {
      alert(response.data.message || "Sign in failed");
    }

    setInputs({
      email: "",
      password: "",
    });
  } catch (error) {
    alert("Network or server error");
    console.error(error);
  }
};

  return (
    <div className='signin'>
      <div className='container'>
      <div className='row'>
      <div className='col-lg-8 d-flex justify-content-center align-items-center column'>
     <div className='d-flex  flex-column w-100 p-3'>
        <input className='p-2 my-3 input-signin' 
        type='email'
        name='email' 
        placeholder='Enter Your Email'
        onChange={change}

        value={Inputs.email}
        />
        
         <input className='p-2 my-3 input-signin' 
        type='password' 
        name='password' 
        placeholder='Enter Your Password'
        onChange={change}

        value={Inputs.password}

        />
        <button className='btn-signin p-2' onClick={submit}>Sign in</button>
     </div>
      </div>
      <div className='col-lg-4 d-flex justify-content-center align-items-center column col-left'>
      <h1 className='text-center sign-in-heading'>Sign <br/> in</h1>
      </div>

      </div>

      </div>
    </div>
  )
}

export default Signin
