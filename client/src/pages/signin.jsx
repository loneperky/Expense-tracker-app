import React, { useState } from 'react'
import axios from 'axios'
import '../style/auth.css'
import { useNavigate,Link } from 'react-router-dom'

const SignIn = () => {
  const [email,SetEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const HandleSumit = async(e) =>{
    e.preventDefault()
    axios.defaults.withCredentials = true
    try {
      const resposse = await axios.post("http://localhost:5000/api/login",{
        email,
        password
      })
      if(resposse){
        alert("user logged In successfully")
        console.log(resposse)
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  
  }
 

  return (
    <>
    <div className="overview">
      <div className="register">
        <h2>Hey Welcome Back</h2>
        <form onSubmit={HandleSumit}>
          <label htmlFor="email">Email</label>
          <input type="text" required onChange={(e)=> SetEmail(e.target.value)} placeholder='email'/>

          <label htmlFor="email">Password</label>
          <input type="text" required onChange={(e)=> setPassword(e.target.value)} placeholder='***'/>
          <button type='submit'>Submit</button>
          <p>Don't have an account <Link to="/register" >Register</Link></p>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default SignIn