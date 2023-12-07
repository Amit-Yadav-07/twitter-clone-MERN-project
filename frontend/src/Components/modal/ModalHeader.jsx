import React from 'react'

const ModalHeader = () => {
  return (
    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">New Tweet</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <strong className='p-2' aria-hidden="true">&times;</strong>
                        {/* <button type="button" class="btn-close" aria-bs-label="Close"></button> */}

                    </button>
                </div>
  )
}

export default ModalHeader