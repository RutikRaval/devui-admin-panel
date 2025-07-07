import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorised = () => {
  const navigate=useNavigate()
  return (
    <div className='text-center mt-5'>
      <h4>You are not permitted.</h4>
      <h6>Please Navigate to login page to continue.</h6>
      <button className='btn border mt-2' onClick={()=>navigate('/',{replace:true})}>Login</button>
    </div>
  )
}

export default Unauthorised