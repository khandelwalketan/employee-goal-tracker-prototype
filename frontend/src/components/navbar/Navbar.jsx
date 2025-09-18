import React from 'react'
import "./Navbar.css";
import { GoGoal } from "react-icons/go";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const isLoggedIn=useSelector((state)=>state.isLoggedIn);
  const logout=()=>{
    sessionStorage.clear("id");
    localStorage.clear("year");
    localStorage.clear("quarter");
    
    dispatch(authActions.logout());
    toast.success("You have been logged out successfully!");
    navigate('/');
    
  }
  return (
    <>
      <div>
    <ToastContainer />
      <nav className="navbar navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand" to="/"><b>
    <GoGoal /> &nbsp; GOAL-SETTING APP</b></Link>
    
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        
        <li className="nav-item mx-2">
          <Link className="nav-link active " aria-current="page" to="/about">About us</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link active " aria-current="page" to="/seg">Set/Edit Goals</Link>
        </li>
        {!isLoggedIn &&(<>
          <div className='d-flex'>
          <li className="nav-item mx-2">
          <Link className="nav-link active btn-nav p-2" aria-current="page" to="/signup">Sign up</Link>
        </li>
          </div>
       <div className='d-flex my-lg-0 my-2'>
       <li className="nav-item mx-2">
          <Link className="nav-link active btn-nav  p-2" aria-current="page" to="/signin">Sign in</Link>
        </li>
       </div>
        </>)}
        {isLoggedIn && (
          <div className='d-flex'>
          <li className="nav-item mx-2"  onClick={logout}>
          <Link className="nav-link active btn-nav p-2" aria-current="page" to="#">Log out</Link>
         
        </li>
          </div>

        )}
        
       
       
        
      </ul>
    </div>
  </div>
</nav>
    </div>
    </>
  );
};

export default Navbar
