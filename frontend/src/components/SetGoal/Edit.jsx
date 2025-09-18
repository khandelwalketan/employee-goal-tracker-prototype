import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
const Edit = ({display,edit}) => {
  useEffect(()=>{
    setInputs({title:edit.title,body:edit.body,});
  },[edit]);
  const [Inputs,setInputs]=useState({title:"",body:"",});
  const change=(e)=>{
const {name,value}=e.target;
setInputs({...Inputs,[name]:value});
  };
  const submit=async()=>{
    await axios.put(`http://localhost:1000/api/v2/edittask/${edit._id}`,Inputs).then((response)=>{toast.success(response.data.message);
      
    });
    display("none")
  }
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column edit'>
      <h3>Edit your Goal</h3>
      <input type='text' className='SEG-inputs my-4 w-100 p-3'
       value={Inputs.title}
       name='title'
        onChange={change}
       />
      <textarea className='SEG-inputs w-100 p-3'
       value={Inputs.body}
       name='body'
       onChange={change}

       />
<div>
<button className='btn btn-dark my-4' onClick={submit}>Edit</button>
<button className='btn btn-danger my-4 mx-3' onClick={()=>display('none')}>Close</button>

</div>

</div>
  );
};

export default Edit;
