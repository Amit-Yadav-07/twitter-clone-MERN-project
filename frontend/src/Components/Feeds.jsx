import React, { useEffect } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import TweetModal from './TweetModal'
import SingleTweet from './SingleTweet'
import { useAuthContext } from '../context/authContext'
import { useTweetContext } from '../context/tweetContext'

const Feeds = () => {

  const { allTweets, getAllTweets } = useTweetContext()

  useEffect(() => {
    getAllTweets()
  }, [])



  return (
    <div className="col-xl-8 col-12 col_parent_right">
      <header className='row p-2 mx-auto my-2'>
        <div className='col-6'>
          <a href='' style={{ fontSize: "1.5rem", textDecoration: 'none', color: "black", fontWeight: "bold" }}>Home</a>
        </div>
        <TweetModal />
      </header>


      {allTweets ? allTweets.map((tweet, index) => {
        if (!tweet?.isAReply) {
          return <SingleTweet tweet={tweet} />
        }
      }) : <h1> No Tweets To Show </h1>}
    </div>
  )
}

export default Feeds