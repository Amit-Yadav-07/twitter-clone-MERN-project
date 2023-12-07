import React, { useEffect, useState } from 'react'

const Loading = () => {
    const [count,setCount] = useState(3);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=>--currentCount);
        },1000)

       

        return ()=>clearInterval(interval);
    },[count])
  return (
    <div className='text-center'><img className='img-fluid' src="https://i.gifer.com/ZKZg.gif"/></div>
  )
}

export default Loading