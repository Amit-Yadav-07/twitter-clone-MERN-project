import React from 'react'

const EditUserModalTrigger = ({cssClasses,buttonType='Edit Profile Details'}) => {
  return (
    <button type="button" className={`${cssClasses}`}  data-bs-toggle="modal" data-bs-target={buttonType==='Edit Profile' ? '#editProfile' : "#uploadPhoto"}>
  {buttonType}
</button>
  )
}

export default EditUserModalTrigger