import React from 'react'
import { NavLink } from 'react-router-dom'

const Card = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className='d-flex align-items-center justify-content-between'>
                    <div className=" user_profile"><img src='https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg' className='img-fluid' alt='profile' />
                        {/* <span className='text-danger'>change nhi ho rha hai</span> */}
                    </div>
                    <i className="fa-solid fa-trash-can fs-5"></i>
                </div>
                {/* <div className='ms-5'>Must visit Place</div> */}
                <img className='img-fluid' src='https://plus.unsplash.com/premium_photo-1690446955129-7248ac32faaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80' />
            </div>
            <div class="d-flex h-auto justify-content-around py-2">
                <NavLink><i class="fa-regular fa-heart fs-5 text-black"></i></NavLink>

                <NavLink><i class="fa-regular fa-comment fs-5 text-black bg-info" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></NavLink>


                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Comment</h5>
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

                <NavLink><i className="fa-solid fa-retweet fs-5 text-black"></i></NavLink>
            </div>
        </div>
    )
}

export default Card