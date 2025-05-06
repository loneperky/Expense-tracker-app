import React, { useState } from "react";
import axios from "axios";
import "../style/auth.css";
import { useNavigate, Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const {token} = useParams()
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [num1,setNum] = useState(null)
  const navigate = useNavigate();

  const genPass = (e) =>{
    e.preventDefault()
    const randonNum = Math.floor(Math.random()* 999998)
    const randonNum1 = Math.floor(Math.random()* 999998)
    const num = randonNum + randonNum1
    console.log(randonNum)
    setPassword(num)
    setConfirmPassword(num)
  }
  


  const HandleSumit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
       const API_URL = 'https://expense-tracker-app-3hti.onrender.com'
      password.trim();
      confirmPassword.trim();
      const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, {
        password,
      });
      if (response.status) {
        alert("Everything is ok");
        navigate("/login");
        console.log(response);
      }else{
        alert("something went wrong")
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overview">
        <div className="register">
          <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>New Password</h2>
          <form onSubmit={HandleSumit}>
            <label htmlFor="email">New password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <input
            style={{marginTop:"1rem"}}
              type="password"
              required
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
            />
            <p className="for" onClick={genPass} style={{fontWeight:"bolder",cursor:"pointer"}}>Generate Password</p>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
