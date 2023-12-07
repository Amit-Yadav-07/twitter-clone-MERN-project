import React from 'react'

const Header = () => {
    return (
        <header className='row p-2 mx-auto my-2'>
            <div className='col-6'>
                <a href='' style={{ fontSize: "1.5rem", textDecoration: 'none', color: "black", fontWeight: "bold" }}>Home</a>
            </div>
            <div className='col-6 text-end '>

                {/* <!-- Button trigger modal --> */}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Tweet
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Tweet</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <strong className='p-2' aria-hidden="true">&times;</strong>
                                    {/* <button type="button" class="btn-close" aria-bs-label="Close"></button> */}

                                </button>
                            </div>
                            <div className="modal-body">
                                <textarea placeholder='write Something...' className='form-control' rows='3'></textarea>
                                <hr />
                                <input type='file' className='form-control' />
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Tweet</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header