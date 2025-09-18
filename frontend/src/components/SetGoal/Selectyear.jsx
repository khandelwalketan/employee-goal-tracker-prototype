import React, { useEffect, useState } from 'react'
import './selectyear.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Selectyear() {
    let id =null;
useEffect(()=>{
    id=sessionStorage.getItem("id");
});
    const [selectedYear,setSelectedYear]=useState("2024");
    const navigate = useNavigate();
    const handleYearChange = (date) => {
      const year = date.getFullYear(); // Extract the year from the Date object
      setSelectedYear(year);
  };
    const handleSelectClick =() => {
        
if(id){
  localStorage.setItem("year",selectedYear);
        navigate('/seq');
        }
        else{
            toast.error("Please Sign in!");
            
        }
        
    };
    
  return (
    <div  className="centerDiv">
    <ToastContainer/>
      <div className='content'>
      <h1>Select Year</h1>
      <DatePicker
         selected={selectedYear ? new Date(selectedYear, 0) : null}
        onChange={handleYearChange}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={9}
        className="inputDate"
      />
      <button className="selectButton" onClick={handleSelectClick}>
                    Select
                </button>
      </div>
     
    </div>
  )
}

export default Selectyear