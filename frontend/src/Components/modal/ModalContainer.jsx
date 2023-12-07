import React from 'react'

const ModalContainer = ({children}) => {
  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        {children}
    </div>
</div>
  )
}

export default ModalContainer