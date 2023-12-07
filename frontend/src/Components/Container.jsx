import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/authContext';
import { useTweetContext } from '../context/tweetContext';

const Container = ({children}) => {
    const isTokenPresentInLocalStorage = localStorage.getItem('auth');

  
  

    if(!isTokenPresentInLocalStorage){
        toast.warn('Please Login to continue');
       return <Navigate to='/login'/>
    }else{

        
        
  return (
    <div className="container home_parent">
            <div className="row position-relative cols_parent h-auto">

                {/* ----------------------------------------------------------------- */}

               {children}


                {/* ------------------------------------------------- */}


            </div>
        </div>
  )
}
}

export default Container