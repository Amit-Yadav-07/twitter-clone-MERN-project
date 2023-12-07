import { useState } from "react";
import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from 'axios';
import { useAuthContext } from "../context/authContext";


const defaultRegisterObject = {
    name: '',
    username: '',
    email: '',
    password: ''
}




let Register = () => {


    let [userData, setUserData] = useState(defaultRegisterObject)
    const navigate = useNavigate()

    const {setIsLoading} = useAuthContext()
    const handleChange = (e)=>{
        e.preventDefault()
        setUserData({...userData,[e.target.name]:e.target.value});
    }
    console.log(userData)
  
     const handleSubmit =async(e)=>{
        e.preventDefault();
       try {
        const {data} = await axios.post('http://localhost:5000/api/register',userData);
        toast.success(data?.message);
            setIsLoading(false);
            navigate("/");
            

       } catch (error) {
        toast.error(error?.response?.data?.message);
        return;
    

       }
     }   

    return (

        <>

            <div className='row parent'>
                <div className='col-lg-5 col-12 image-section bg-info py-2'>
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                        <h3 className='text-center'>Join Us</h3>
                        <i className="fa-regular fa-message"></i>
                    </div>
                </div>
                <div className='col-lg-7 col-12 d-flex align-items-center justify-content-center flex-column pt-2' style={{ background: 'whitesmoke' }}>
                    <form className='form d-flex justify-content-center align-items-center flex-column p-3' onSubmit={handleSubmit}>
                        <h2 className='me-auto'>Register</h2>
                        <div className="mb-2 input_parent" >
                            <input type="text" className="form-control" placeHolder='Full Name' name='name' onChange={handleChange} />
                        </div>

                        <div className="mb-2 input_parent">
                            <input type="email" className="form-control" placeHolder='Email' name='email' onChange={handleChange} />
                        </div>

                        <div className="mb-2 input_parent">
                            <input type="text" className="form-control" placeHolder="UserName" name='username' onChange={handleChange} />
                        </div>

                        <div className="mb-2 input_parent">
                            <input type="password" className="form-control" placeHolder="Password" name='password' onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-dark my-2 me-auto">Register</button>

                        <span className='text-start'> Already Have Account ? <Link to={'/login'} style={{ textDecoration: 'none' }}>login</Link></span>

                    </form>
                </div>
            </div>
        </>

    )
}


export default Register;