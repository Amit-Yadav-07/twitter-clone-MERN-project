import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const TweetContext = React.createContext()
export const TweetProvider = ({ children }) => {

  const [allTweets, setAllTweets] = useState([]);


  // ye newTweetText tweets ko set krne ke liye help krta karta hai 
  const [newTweetText, setNewTweetText] = useState('');


  // ye file State variable file upload ko manage krta hai 
  const [file, setFile] = useState({});

  //  useNavigate hook for navigation in the frontend
  const navigate = useNavigate();


  //  saare tweets get krne ke liye database se 

  const getAllTweets = async () => {

    try {
      const response = await axios.get('http://localhost:5000/api/tweets');
      console.log(response);


      setAllTweets(response?.data?.tweets);

    } catch (error) {

      //  this helps to remove JWT token localStorage agar kuch problem hai database access /backend 
      //  this helps us to keep away the confusion & start afresh from the beginning i.e : login page & then feeds
      if (error.message === "Network Error") {
        toast.error("Unable to fetch posts due to network error! Please login again");

        localStorage.removeItem('auth');
        //  navigate to login 
        navigate('/login');
      }
      console.log(error)
    }
  }









  return (
    <TweetContext.Provider
      value={{ allTweets, newTweetText, setNewTweetText, getAllTweets, file, setFile }}
    >
      {children}
    </TweetContext.Provider>
  )
}

export const useTweetContext = () => {
  return useContext(TweetContext)
}