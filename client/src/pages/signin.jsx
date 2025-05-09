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
  const API_URL = "https://expense-tracker-app-3hti.onrender.com";
  const HandleSumit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const cleanedEmail = email.trim().toLowerCase();
      const cleanedPassword = password.trim();

      if (!cleanedEmail || !cleanedPassword) {
        toast.error("Please fill in all fields");
        return;
      }

      if (cleanedPassword.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: cleanedEmail,
          password,
        },
        {
          withCredentials: true, // important for cookie-based auth
        }
      );

      const { status, message, user } = response.data;

      if (!status) {
        // status: false from backend => invalid credentials
        toast.error(message || "Invalid email or password");
        return;
      }

      // Login was successful
      const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning 🌅";
        else if (hour < 17) return "Good afternoon ☀️";
        else return "Good evening 🌙";
      };

      toast.success(`${getGreeting()} ${user.fullname}`);
      alert(user.fullname);
      console.log("User logged in:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
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
                name="email"
                required
              />
            </div>

            <label htmlFor="email">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***"
              name="password"
              required
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
