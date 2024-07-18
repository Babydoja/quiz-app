import React from 'react'
import './email.css'
import { Link, useNavigate } from 'react-router-dom'



const Email = () => {
  const navigate = useNavigate ()
  const DisplayAnswer = () =>{
    // e.preventDefault ()
   navigate ('/answer')
  }
  return (
 
    <div className='container e-container --form-control'>
      

<h3>INPUT EMAIL TO GET ANSWERS</h3>
<div className='passmail'>

<input type='email' placeholder='Email'/>
<div className='enter-button'>
  <button type='submit' className='--btn --btn-primary' onClick={DisplayAnswer}>Enter</button>
</div>

</div>

<Link to="/scoreboard"><button className='back-to-score --btn --btn-primary --btn-block'>Back To Score</button></Link>


    </div>
  )
}

export default Email