import React from 'react'

const EditUserFormInput = ({type,placeholder,name,onChange}) => {
  return (
    <div className="mb-2 input_parent">
    <input type={`${type}`} className="form-control" placeHolder={`${placeholder}`} name={`${name}`} onChange={onChange} />
</div>
  )
}

export default EditUserFormInput