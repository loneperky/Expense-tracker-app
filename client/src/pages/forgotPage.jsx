import React, { useState } from "react";
import axios from "axios";
import "../style/auth.css";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, SetEmail] = useState("");
  const navigate = useNavigate();

  const HandleSumit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      email.toLowerCase().trim()
      const response = await axios.post("http://localhost:7000/auth/forgot-password", {
        email,
      });
      if (response.status) {
        alert("check your email for confirmation link");
        console.log(response);
      }else{
        alert("something went wrong")
        console.log(response)
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overview">
        <div className="register">
          <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>Account Recovery</h2>
          <form onSubmit={HandleSumit}>
            <label htmlFor="email">Enter account email</label>
            <input
              type="text"
              name="email"
              required
              onChange={(e) => SetEmail(e.target.value)}
              placeholder="email"
            />
            <p className="for"><Link to="/login">Continue with password</Link></p>
            <button type="submit">Submit</button>
            <p>
              Don't have an account <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
