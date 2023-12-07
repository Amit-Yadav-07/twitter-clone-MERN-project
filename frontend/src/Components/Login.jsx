import "./Register.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useAuthContext } from "../context/authContext";

let Login = () => {

    let navigate = useNavigate();
    const { setIsLoading, setUserToken } = useAuthContext()

    const defaultLoginObject = {
        email: '',
        password: '',
    }


    let [loginData, setLoginData] = useState(
        defaultLoginObject
    );

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5000/api/login', loginData);

            const data = response?.data

            console.log(response?.status)




            localStorage.setItem('auth', JSON.stringify(data?.token));
            toast.success(data?.message);
            setIsLoading(false);
            navigate("/");


        } catch (error) {
            setIsLoading(false)
            toast.error(error?.response?.data?.message);

            // if(error.message==='Request failed with status code 404'){

            //     toast.error("User not found!");
            // }
            // console.log(error)


            if (error.message === 'Network Error') {
            }
            if (error?.response?.status === 500) {

                toast.error('kuch toh gadbad hai server me')

            }

            return;
        }


    }



    return (

        <>

            <div className='row parent'>
                <div className='col-lg-5 col-12 image-section bg-info py-2'>
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                        <h3 className='text-center'>Welcome Back</h3>
                        <i className="fa-regular fa-message"></i>
                    </div>
                </div>
                <div className='col-lg-7 col-12 d-flex align-items-center justify-content-center flex-column pt-2' style={{ background: 'whitesmoke' }}>

                    <form onSubmit={SubmitHandler} className='form d-flex justify-content-center align-items-center flex-column p-3'>
                        <h2 className='me-auto'>Login</h2>
                        <div className="mb-2 input_parent">
                            <input type="Email" className="form-control" placeHolder="Email" name='email' onChange={handleChange} />
                        </div>

                        <div className="mb-2 input_parent">
                            <input type="password" className="form-control" placeHolder="Password" name='password' onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-dark my-2 me-auto">Login</button>

                        <span className='text-start pt-3'>Create an Account ? <Link to={'/register'} style={{ textDecoration: 'none' }}>Register</Link></span>

                    </form>
                </div>
            </div>
        </>

    )
}


export default Login;