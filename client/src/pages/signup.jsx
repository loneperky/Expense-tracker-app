import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const HandleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/register",{
        email,
        password,
        fullname,
      });
      if(response.status){
        alert("User registered successfully")
        console.log(response)
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
   
  };

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="fullname"></label>
        <input type="text" onChange={(e)=> setFullname(e.target.value)} name="fullname" placeholder="Fullname" />
        <br />
        <label htmlFor="email">Email</label>
        <input type="text" onChange={(e)=> setEmail(e.target.value)} name="email" placeholder="Email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="text" onChange={(e)=> setPassword(e.target.value)} name="password" placeholder="*****" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
