import React, { useEffect, useState } from 'react';
import './SetEditGoal.css';
import SEGCards from './SEGCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './Edit';
import axios from 'axios';
let toEditArray = [];
const SetEditGoal = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [array, setArray] = useState([]);
    const [id, setId] = useState(sessionStorage.getItem("id"));
    const [year, setYear] = useState(localStorage.getItem("year"));
    const [quarter, setQuarter] = useState(localStorage.getItem("quarter"));

    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("TITLE or BODY should not be empty");
        } else {
            if (id) {
                await axios.post("http://localhost:1000/api/v2/addtask", {
                    title: Inputs.title,
                    body: Inputs.body,
                    _id: id,
                    year: year,
                    quarter: quarter,
                }).then((response) => {
                    console.log(response);
                });

                setInputs({ title: "", body: "" });
                toast.success("Your Goal is added!");
            } else {
                setArray([...array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your Goal is added!");
                toast.error("Your Goal is not saved! Please Sign up!");
            }
        }
    };

    const del = async (Cardid) => {
        if (id) {
            await axios.delete(`http://localhost:1000/api/v2/deletetask/${Cardid}`, {
                data: { id: id },
            }).then(() => {
                toast.success("Your Task Is Deleted");
            });
        } else {
            toast.error("Please SignUp First");
        }
    };

    const dis = (value) => {
        document.getElementById('SEG-edit').style.display = value;
    };

    const edit = (value) => {
        // Implement your edit logic here
        toEditArray = array[value];

    };
    useEffect(() => {
        setId(sessionStorage.getItem("id")); // Update id from sessionStorage
        setYear(localStorage.getItem("year"));
        setQuarter(localStorage.getItem("quarter"));
    }, []);
    const fetchData = async () => {
        if (id && year && quarter) {
            await axios.get(`http://localhost:1000/api/v2/gettask/${id}/${year}/${quarter}`)
                .then((response) => {
                    setArray(response.data.list);
                }).catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
        else {
            setArray([]); // Clear array if id, year, or quarter is missing
        }
    };
    useEffect(() => {
        fetchData();
    }, [id, year, quarter,submit]);

    return (
        <>
            <div className='SEG'>
                <ToastContainer />
                <div className='SEG-main container d-flex justify-content-center align-items-center my-4 flex-column'>
                    <div className='d-flex flex-column SEG-inputs-div w-100 p-1'>
                        <input
                            type='text'
                            placeholder='TITLE'
                            className='my-2 p-2 SEG-inputs'
                            onClick={show}
                            name='title'
                            value={Inputs.title}
                            onChange={change}
                        />
                        <textarea
                            type='text'
                            id='textarea'
                            placeholder='BODY'
                            className='p-2 SEG-inputs'
                            name='body'
                            value={Inputs.body}
                            onChange={change}
                        />
                    </div>
                    <div className='w-lg-50 w-100 d-flex justify-content-end my-3'>
                        <button className='home-btn px-2 py-1' onClick={submit}>Save</button>
                    </div>
                </div>
                <div className="SEG-body">
                    <div className="container-fluid">
                        <div className="row">
                            {array && array.map((item, index) => (
                                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                                    <SEGCards
                                        title={item.title}
                                        body={item.body}
                                        id={item._id}
                                        delid={del}
                                        display={dis}
                                        editId={index}
                                        toBeEdit={edit}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="SEG-edit" id="SEG-edit">
                <div className="container edit">
                    <Edit display={dis} edit={toEditArray}/>
                </div>
            </div>
        </>
    );
};

export default SetEditGoal;
