import React, { useState } from "react";
import axios from "axios";
import "../style/auth.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSumit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      email.toLowerCase().trim();
      password.trim();
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      const response = await axios.post("http://localhost:7000/auth/login", {
        email,
        password,
      });
      if (!response.status) {
        toast.error("User not found");
        navigate("/login");
        console.log(response);
      } else {
        toast.success("User logged in successfully");
        console.log(response, "user logged in successfully");
        alert(response.data.fullname);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overview">
        <div className="register">
          <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>Login</h2>
          <form onSubmit={HandleSumit}>
            <div className="">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={(e) => SetEmail(e.target.value)}
                placeholder="email"
              />
            </div>

            <label htmlFor="email">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***"
            />
            <p className="for">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
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

export default SignIn;
