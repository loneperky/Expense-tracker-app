import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/auth.css";
import axios from "axios";
function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      fullname.trim();
      email.trim();
      password.trim();
      if (!fullname || !email || !password) {
        toast.error("Please fill in all fields");
        return
      }
      if (fullname.length < 3) {
        toast.error("Fullname must be at least 3 characters long");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Email is not valid");
        return;
      }
      if (password.length > 20) {
        toast.error("Password must be less than 20 characters long");
        return;
      }
      const API_URL = 'https://expense-tracker-app-3hti.onrender.com'
      const response = await axios.post( `${API_URL}/auth/register`, {
        fullname,
        email,
        password,
      });
      if (response.status) {
        console.log(response);
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        toast.error("User already exists");
        alert("there was an error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <div className="overview">
          <div className="register">
            <h1>Sign up</h1>
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              required
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              placeholder="Fullname"
              autoComplete="off"
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
              autoComplete="off"
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="*****"
              autoComplete="off"
            />
            <button type="submit" style={{ backgroundColor: "whitesmoke" }}>
              Submit
            </button>
            <p>
              Already registered <Link to="/login">LogIn</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
