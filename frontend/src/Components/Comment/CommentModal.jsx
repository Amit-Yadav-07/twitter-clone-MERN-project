import axios from 'axios'
import React, { useState } from 'react'
import { useTweetContext } from '../../context/tweetContext'

export const CommentModal = ({ tweetId }) => {

  const [comment, setComment] = useState()
  console.log(tweetId)


  const { getAllTweets } = useTweetContext()
  const handleComment = async () => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/tweets/comment/${tweetId}`, { comment });
      console.log(data)
    } catch (error) {
      console.log(error)
    }

    // ! refresh all tweets by fetching them from the backend, so that any new replies will show under the respective tweet
    getAllTweets()
  }
  return (
    <div>
      <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Comment</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body mx-auto">
              <textarea type="text" placeholder='Write Your Comment..' onChange={(e) => setComment(e.target.value)} rows={5} cols={40} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleComment} data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

