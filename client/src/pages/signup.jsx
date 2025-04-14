import React, { useState } from "react";
import "../style/auth.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email,
        password,
        fullname,
      });
      if (response.status) {
        alert("User registered successfully");
        console.log(response);
        navigate("/login");
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
              type="text"
              required
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="*****"
              autoComplete="off"
            />
            <button type="submit">Submit</button>
            <p>
              Already registered <Link to="/login">LogIn</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
