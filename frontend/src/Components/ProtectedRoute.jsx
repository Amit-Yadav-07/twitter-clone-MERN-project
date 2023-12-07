import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/authContext';

const ProtectedRoute = ({children}) => {
    const location = useLocation()

    const isTokenPresentInLocalStorage = localStorage.getItem('auth');


    if(isTokenPresentInLocalStorage){
        toast.success('User already logged in');
       return <Navigate to='/'/>
    }

   
    

   

    let cssClass = ''
    
    if(location.pathname==='/register'){
        cssClass = 'register_parent';
    }else if(location.pathname==='/login'){
        cssClass = 'login_parent';

    }



  return (
    <div className={`container ${cssClass}`}>{children}</div>
  )
}

export default ProtectedRoute