import React, { useState } from 'react'
import EditUserModalTrigger from './EditUserModalTrigger'
import EditUserFormInput from './EditUserFormInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../context/authContext.js'

const defaultEditUserObject = {
  new_name: '',
  new_username: '',
  new_email: '',
  date_of_birth: ''
}

const EditProfileModal = ({ cssClasses, buttonType }) => {

  const [editUserDetails, setEditUserDetails] = useState(defaultEditUserObject)
  const { setCurrentUser, getCurrentUser } = useAuthContext()

  const [file, setFile] = useState();


  console.log(buttonType)
  const handleChange = (e) => {
    if (buttonType === 'Edit Profile') {
      e.preventDefault()
      console.log(e.target.value)
      setEditUserDetails({ ...editUserDetails, [e.target.name]: e.target.value })
      console.log(editUserDetails)

    } else if (buttonType === 'Upload Photo') {

      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0]
      }

      setFile(img)

    }





  }

  const handleSubmit = async (e) => {
    e.preventDefault()




    if (buttonType === 'Edit Profile') {
      console.log('from edit profile')
      const answer = window.confirm(`
            Are you sure? \n
            New Name : ${editUserDetails.new_name} \n
            New Email : ${editUserDetails.new_email} \n
            New Username : ${editUserDetails.new_username} \n
        `)

      if (answer) {
        try {
          const response = await axios.patch('http://localhost:5000/api/edit_profile', { editUserDetails })


          console.log(response?.data)
          if (response?.status === 200) {
            localStorage.setItem('auth', JSON.stringify(response?.data?.newToken))

            setCurrentUser(response?.updatedUser);
            toast.success("User Updated Successfully");
          }
          getCurrentUser();



        } catch (error) {
          toast.error(error?.response?.data?.message)
        }

      }
    } else if (buttonType === 'Upload Photo') {
      const formData = new FormData();

      let image_url = ''

      try {
        formData.append('file', file?.data)
        const response = await axios.patch('http://localhost:5000/api/image', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

        const { data } = response;
        if (response?.status === 201) {

          toast.success(data?.message);


        }
      } catch (error) {
        toast.error(error.message);
      }
      getCurrentUser()
    }
  }

  return (
    <>
      <EditUserModalTrigger buttonType={buttonType} cssClasses={cssClasses} />

      <div className="modal fade" id={buttonType === 'Edit Profile' ? 'editProfile' : 'uploadPhoto'} tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                {buttonType === 'Upload Photo' && <>
                  <EditUserFormInput type={'file'} placeholder="" name="file" onChange={handleChange} />

                </>}

                {buttonType === 'Edit Profile' && <>
                  <EditUserFormInput type={'text'} placeholder="Enter new name" name="new_name" onChange={handleChange} />
                  <EditUserFormInput type={'text'} placeholder="Enter new Username" name="new_username" onChange={handleChange} />
                  <EditUserFormInput type={'email'} placeholder="Enter new Email" name="new_email" onChange={handleChange} />
                  <EditUserFormInput type={'date'} placeholder="" name="date_of_birth" onChange={handleChange} />
                </>}

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class={`btn btn-primary `} data-bs-dismiss="modal">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfileModal