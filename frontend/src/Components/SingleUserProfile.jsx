import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

const SingleUserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState();
  const { currentUser, getCurrentUser } = useAuthContext();
  const { id } = params;

  const getSingleUser = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(data?.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }


  const handleFollow = async (stalker, victim) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/follow/${stalker}/${victim}`);
      console.log(response);

      if (response?.status === 201) {
        toast.success(response?.data?.message);
      } else if (response?.status === 200) {
        toast.success(response?.data?.message);
      }

      getSingleUser(victim);
      getCurrentUser();

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  useEffect(() => {
    getSingleUser(id);
  }, [])


  return (

    <div className="col-lg-8 col-12 profile-top-level  border border-black py-2 ">
      <div className='profile_page_Parent'>
        {/* <Header /> */}
        <div>
          <h4 className='pt-3 px-2'>Profile</h4>
        </div>


        <div className='bg-info Profile_Cover_parent'>
          <div className='Profile_Cover_section shadow'>
            <figure>
              <img className='img-fluid' src="https://images.unsplash.com/photo-1609102026400-3c0ca378e4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" />
            </figure>
            <button onClick={() => {
              handleFollow(currentUser?._id, id)
            }} className='btn btn-dark mx-3 mb-4'>{currentUser?.Following?.includes(id) ? 'Unfollow' : 'Follow'}</button>
          </div>

          <div className=''>
            <strong className='px-3'>{user?.name}</strong><br />
            <NavLink className='ps-4 text-decoration-none text-primary'>@{user?.username}</NavLink>
          </div>
          <div className='my-3'>
            <i class="fa-solid fa-calendar-days px-3"></i>
            <strong className='me-4'>21-Aug-2023</strong>
            <i class="fa-solid fa-location-dot px-3"></i>
            <strong className=''>Lucknow India</strong><br />
            <i className="fa-regular fa-calendar-days px-3"></i>
            <strong>Join 1 jun 2020</strong>
            <div className='py-4'>
              <strong className='mx-5'>{user?.Following?.length} Following</strong>
              <strong>{user?.Followers?.length} Followers</strong>
            </div>
          </div>
          <p className='text-center fs-5 fw-bold'>Tweets and posts</p>

          <div className=''>
            <p className='pt-3'>not tweet</p>
          </div>
        </div>
      </div>




    </div>


  )
}

export default SingleUserProfile