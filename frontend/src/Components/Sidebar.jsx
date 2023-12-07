import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthContext } from '../context/authContext'

const Sidebar = ({ currentUser }) => {

  const navigate = useNavigate()
  const { setUserToken, setCurrentUser } = useAuthContext()

  return (
    <div
      className="sidebar col-xl-4 col-12">

      {/* start bootstrap */}

      <nav className="navbar navbar-expand-xl">

        <div className="container-fluid">
          <div className='d-flex'>
            <i class="fa-brands fa-twitter"></i>
            <NavLink className="navbar-brand">Twitter</NavLink>
          </div>
          <i className="navbar-toggler fs-3" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="fa-solid fa-bars">

            </span>
          </i>
          <div className="collapse navbar-collapse " id="navbarNav">

            {/* -------------------------------my code ------------------------ */}

            <div className='icons_parent'>
              <NavLink><img className='img-fluid msg-img' src='https://img.icons8.com/?size=512&id=X058LKzNOhaF&format=png' alt='image' /></NavLink>
              <NavLink to='/' className={"links"} style={{ textDecoration: 'none', color: 'black' }}><i class="fa-solid fa-house mx-2  fs-4"></i>Home</NavLink>
              <NavLink to='/profile' className={"links"} style={{ textDecoration: 'none', color: 'black' }}><i class="fa-solid fa-user mx-2 fs-4"></i>Profile</NavLink>
              <div onClick={() => {
                // ! logout user 
                localStorage.removeItem('auth');
                setUserToken(null);
                setCurrentUser(null);
                // ! show toast message of logout
                toast.success('User logged out successfully');
                // ! then navigate to login page
                navigate('/login');

              }} className="links" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}><i class="fa-solid fa-right-from-bracket fs-4 btn"></i>Logout</div>
            </div>

            <div className='row d-flex justify-content-center align-items-center left-bottom-profile '>
              <div className='col-md-6 col-12 circle-profile' style={{ maxHeight: "1rem" }}>
                {/* <i className="fa-regular fa-user fa-2x pt-1"></i> */}
                <img style={{ objectFit: "cover", borderRadius: "50%" }} src={currentUser?.ProfileImageURL} height={"100%"} />
              </div>

              <div className='col-md-6 col-12 name_parent text-center my-3' >
                <strong>{currentUser?.name}</strong>
                <em>some text</em>
              </div>
            </div>

            {/*------------------------ my code end ---------------------------------------------- */}


          </div>
        </div>
      </nav>
      {/* end bootstrap */}
    </div>
  )
}

export default Sidebar