import './Home.css';
import { NavLink, Outlet, useLocation } from "react-router-dom"
import Sidebar from './Sidebar';
import SharedLayout from './Feeds';
import Container from './Container';
import { useAuthContext } from '../context/authContext';
import { useEffect } from 'react';

let Home = () => {

    const {getCurrentUser,currentUser} = useAuthContext();

    useEffect(()=>{
      getCurrentUser()
    },[])
    return (
      <Container>
               
                <Sidebar currentUser={currentUser}/>


                <Outlet />
      </Container>




       


    )
}


export default Home;


