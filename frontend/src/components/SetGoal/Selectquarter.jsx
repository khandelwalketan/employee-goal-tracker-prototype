import React, { useState } from 'react'
import './selectquarter.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom';


function Selectquarter() {
    const [selectedQuarter,setSelectedQuarter]=useState(null);
    const navigate = useNavigate();
    const handleQuarterChange = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const quarter = Math.floor(month / 3) + 1;
      const quarterString = `Q${quarter} ${year}`;
      setSelectedQuarter(quarterString);
  }
    const handleSelectClick = () => {
      localStorage.setItem("quarter",selectedQuarter);

        navigate('/qseg');
    };
  return (
    <div  className="centerDiv">
      <div className='content'>
      <h1 className="rightShift">Select Quarter</h1>
      <DatePicker
         selected={selectedQuarter ? new Date(parseInt(selectedQuarter.split(' ')[1]), (parseInt(selectedQuarter.split(' ')[0][1]) - 1) * 3) : null}
        onChange={handleQuarterChange}
        showQuarterYearPicker
        dateFormat="QQQ"
       
        className="inputDate"
       
      />
      <button className="selectButton" onClick={handleSelectClick}>
                    Select
                </button>
      </div>
    </div>
  )
}

export default Selectquarter