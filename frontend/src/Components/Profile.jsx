import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from './Header'
import { useAuthContext } from '../context/authContext'
import EditProfileModal from './EditUser/EditProfileModal'
import axios from 'axios';

const Profile = () => {

  const { userToken, currentUser } = useAuthContext()
  const [userTweets, setUserTweets] = useState([])

  console.log(currentUser)

  const GetUserTweets = async () => {

    try {
      console.log(currentUser._id);
      const response = await axios.get(`http://localhost:5000/api/tweets/getUserTweets/${currentUser?._id}`);
      console.log(response);
      setUserTweets(response?.data?.tweets)
    } catch (error) {
      console.log(error);
    }


  }

  console.log(userTweets);
  useEffect(() => {
    GetUserTweets()
  }, [currentUser])

  return (

    <div className="col-lg-8 col-12 profile-top-level py-2">
      <div className='profile_page_Parent'>
        {/* <Header /> */}
        <div >
          <h4 className='pt-3 px-2'>Profile</h4>
        </div>


        <div className='Profile_Cover_parent '>
          <div className='Profile_Cover_section shadow py-2'>
            <figure>
              <img className='img-fluid' src={currentUser?.ProfileImageURL} alt='img' />
            </figure>
            <EditProfileModal buttonType='Upload Photo' cssClasses={`btn btn-dark mx-3 my-3`} />
            <EditProfileModal buttonType='Edit Profile' cssClasses={`btn btn-dark mx-3 my-3`} />
          </div>

          <div className='py-1 my-1'>
            <strong className='px-3'>{currentUser?.name}</strong><br />
            <NavLink className='ps-4 text-decoration-none text-primary'>@{currentUser?.username}</NavLink>
          </div>
          <div className='my-3'>
            <i class="fa-solid fa-calendar-days px-3"></i>
            <strong className='me-4'>21-Aug-2023</strong>
            <i class="fa-solid fa-location-dot p-3"></i>
            <strong className=''>Lucknow India</strong><br />
            <i className="fa-regular fa-calendar-days px-3"></i>
            <strong>Join 1 jun 2020</strong>
            <div className='py-4'>
              <strong className='mx-5'>1 following</strong>
              <strong>1 follower</strong>
            </div>
          </div>
          <p className='text-center fs-5 fw-bold'>Tweets and posts</p>

          <div className='pt-2 shadow'>

            {
              userTweets.map((tweet) => {
                { console.log(tweet) }
                return (

                  <div className='mx-auto  text-center d-flex justify-content-between p-2'>
                    <i className="fa-regular fa-comment px-3"></i>
                    {tweet.tweetText}

                    <hr />
                  </div>
                )
              })
            }

          </div>
        </div>





      </div>




    </div>


  )
}

export default Profile