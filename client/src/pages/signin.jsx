import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email,SetEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const HandleSumit = async() =>{
    try {
      const resposse = await axios.post("http://localhost:5000/api/login",{
        email,
        password
      })
      if(resposse.status){
        alert("user logged In successfully")
        navigate("/dashboard")
        console.log(resposse)
      }
    } catch (error) {
      console.log(error)
    }
  
  }
 

  return (
    <>
      <h2>Hey Welcome Back</h2>
      <form onSubmit={HandleSumit}>
        <label htmlFor="email">Email</label>
        <input type="text" onChange={(e)=> SetEmail(e.target.value)} placeholder='email'/>

        <label htmlFor="email">Password</label>
        <input type="text" onChange={(e)=> setPassword(e.target.value)} placeholder='***'/>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default SignIn