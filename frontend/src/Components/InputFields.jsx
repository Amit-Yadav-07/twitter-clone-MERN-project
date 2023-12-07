import React, { useRef, useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useTweetContext } from '../context/tweetContext'

const InputFields = () => {
  
    const {newTweetText,setNewTweetText,getAllTweets,file,setFile} = useTweetContext()
    
    
    const imageInputRef = useRef()
    

    const handleChange = (e)=>{
        setNewTweetText(e.target.value);
    }

    const handleFileChange = (e)=>{
        const img = {
            preview : URL.createObjectURL(e.target.files[0]),
            data:e.target.files[0]
        }
        setFile(img)
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();

        if(!newTweetText || !file){
            toast.error("Please enter something to tweet");
            return;
        }

        try {
            const formData = new FormData();

        let image_url = ''

        formData.append('file',file?.data)
            const {data} = await axios.post('http://localhost:5000/api/image',formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            console.log(data?.imgURL)
            image_url = data?.imgURL
            const {data2} = await axios.post('http://localhost:5000/api/tweets',{newTweetText,image_url})

            toast.success("Tweet Created Successfully");
            getAllTweets()
            setNewTweetText('')
            
            console.log(data);
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
       

        // try {


        //     const {data} = await axios.post('http://localhost:5000/api/tweets',{newTweetText})
        //     toast.success("Tweet Created Successfully");
        //     getAllTweets()
        //     console.log(data);
        // } catch (error) {
        //     toast.error(error?.response?.data?.message)
        //     console.log(error)
        // }
    }


    
  return (
    <form onSubmit={handleSubmit}>
    <textarea onChange={handleChange} name="tweetText" placeholder='write Something...' className='form-control' rows='3'
    
    ></textarea>
    <hr />
    <input type='file'   className='form-control' name='file' ref={imageInputRef} onChange={handleFileChange} />
    {file?.preview && <>
        <img className='py-5 me-5 border border-black my-2' src={file?.preview} width='70%' height='50%' />
        <button className='btn btn-danger' onClick={()=>{
            setFile(null)
            imageInputRef.current.value = ''
        }}><i class="fa-solid fa-xmark"></i></button>
    </>}
    <div class="modal-footer">
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Tweet</button>
</div>
    </form>
  )
}

export default InputFields