import axios from 'axios';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useTweetContext } from '../context/tweetContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useAuthContext } from '../context/authContext';
import { CommentModal } from './Comment/CommentModal'

const SingleTweet = ({ tweet }) => {
    const { getAllTweets, allTweets } = useTweetContext();
    const { currentUser } = useAuthContext();


    console.log(allTweets)

    const navigate = useNavigate()

    console.log(currentUser?._id)

    const handleLikeRequest = async (tweetId) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/tweet/likeUnlike/${tweetId}`)

            if (response?.status === 201) {
                toast.success(response?.data?.message)
            } else if (response?.status === 200) {
                toast.success(response?.data?.message)
            }

            getAllTweets()
            console.log(response)

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    const handleDelete = async (tweetId) => {
        console.log(tweetId);

        let isOk = window.confirm('Do you really want to delete?');


        if (isOk) {
            try {
                // delete the image
                const response = await axios.delete(`http://localhost:5000/api/image/${tweetId}`)


                console.log(response)
                if (response?.status === 200) {
                    toast.success(response?.data?.message);
                }
                else {
                    return;
                }
                // delete the tweet 
                const { data } = await axios.delete(`http://localhost:5000/api/tweets/${tweetId}`);
                console.log(data);
                toast.success(data?.message);
                getAllTweets()
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        }
    }
    return (
        <>

            <div class="card d-flex align-items-center justify-content-center flex-column my-2 shadow">
                <div class="card-body w-100">
                    <div className='d-flex align-items-center justify-content-between'>
                        <div onClick={() => {
                            navigate(`/profile/${tweet?.TweetedBy?._id}`)
                        }} className="user_profile"


                        ><img style={{ borderRadius: "50%", maxWidth: "3rem", marginRight: "0.5rem" }} src={currentUser?.ProfileImageURL} className='img-fluid' alt='profile' />
                            <span className='fw-bold ms-2' style={{ fontSize: '1rem', cursor: 'pointer' }}>{tweet?.TweetedBy?.username}</span>
                        </div>


                        {currentUser?._id === tweet?.TweetedBy?._id && <i class="fa-solid fa-trash-can fs-5" onClick={() => handleDelete(tweet?._id)} style={{ cursor: 'pointer' }}></i>}
                    </div>
                    <hr />
                    <div className='my-2'>
                        <strong className=' d-block ps-5'>{tweet.tweetText}</strong>
                        <img className='img-fluid mx-auto d-block p-2' src={tweet?.ImageURL ? tweet?.ImageURL : 'https://plus.unsplash.com/premium_photo-1690446955129-7248ac32faaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80'} alt='tweet-img' />
                    </div>
                </div>

                <div class="d-flex h-auto justify-content-around flex-row py-2">
                    <span onClick={() => handleLikeRequest(tweet?._id)}>
                        {tweet?.Likes?.includes(currentUser?._id) ? <AiFillHeart color='red' fontSize={30} cursor={'pointer'} /> :
                            <AiOutlineHeart fontSize={30} cursor={'pointer'} />
                        } {tweet?.Likes?.length}



                    </span>

                    <NavLink><i class="fa-regular fa-comment fs-5 text-black px-5" data-bs-toggle="modal" data-bs-target="#commentModal"></i></NavLink>



                    <CommentModal tweetId={tweet?._id} />
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="commentModal">Comment</h5>
                                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                        <strong className='p-2' aria-hidden="true">&times;</strong>

                                    </button>

                                </div>
                                <div className="modal-body">
                                    <textarea placeholder='write Something...' className='form-control' rows='3'></textarea>
                                    <hr />
                                    {/* <input type='file' className='form-control' /> */}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Comment</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <NavLink><i class="fa-solid fa-retweet fs-5 text-black"></i></NavLink>

                </div>

                <hr className='' />
                {/* // -----------------------comments------------------------------- */}
                {
                    tweet?.Replies.map((replyTweet) => {

                        return <div className='fw-bold text-center w-100 p-2' style={{}}>{replyTweet.tweetText}</div>
                    })
                }

            </div>




        </>
    )
}

export default SingleTweet