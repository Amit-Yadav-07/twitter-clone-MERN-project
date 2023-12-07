import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AuthContext = React.createContext()
export const AuthProvider = ({ children }) => {


  // JWT token backend se frontend pe aa rha hai 
  const [userToken, setUserToken] = useState()

  //  jab humari aap load ho ya na ho ye isLoading state se manage karega isLoading variable ko (Boolean)
  const [isLoading, setIsLoading] = useState(false)


  //  saare tweets jo mongoDB mai stored hai wo allTweets variable state se manage honge  
  const [allTweets, setAllTweets] = useState([])

  // jo current logged in user hai wo is Current State wale variable mai aayega 
  const [currentUser, setCurrentUser] = useState();




  // ye axios request fetch krega tweets ko jo Database mai stored hai 
  const getAllTweets = async () => {
    const { data } = await axios.get('http://localhost:5000/api/tweets');
    setAllTweets(data?.tweets);
  }



  // ye token variable get krega token ko LocalStorage se 
  const token = JSON.parse(localStorage.getItem('auth'))


  //  ye function get krega current user ko Database se 
  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/currentUser');
      console.log(data);

      setCurrentUser(data?.user);
    } catch (error) {

      // error handle krega frontend mai 
      if (error.response.data.message === 'jwt malformed') {

        // toast.error('jwt has expired. kindly login again')
      }
    }
  }


  // ! automate the sending of jwt token from the frontend
  // ! with this setup, we don't have to send the jwt token again and again from the frontend
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };



  return (
    <AuthContext.Provider


      // ye saare values ko hum pure app mai kahi bhi use kr sakte hai kyuki ye <AuthProvider> wrap krega puri app ko 
      value={{ userToken, setUserToken, isLoading, setIsLoading, allTweets, setAllTweets, getAllTweets, getCurrentUser, currentUser, setCurrentUser }}
    >
      {/* // ! Our whole React Application in the <App /> component */}
      {children}
    </AuthContext.Provider>
  )
}
//  with this we can directly import the values such as [userToken, setUserToken, isLoading, setIsLoading, allTweets, setAllTweets, getAllTweets, getCurrentUser, currentUser, setCurrentUser] without having confusing names of context.

//  this helps to avoid confusion in reading the code & directly becomes clear which context we are importing from
export const useAuthContext = () => {
  return useContext(AuthContext)
}