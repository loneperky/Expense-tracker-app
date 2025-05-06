import React from "react";
import HomePage from "../pages/homePage";
import History from "../pages/history";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "./Navbar";
import "../style/home.css";
import Index from "../pages/Index";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import ProtectedRoute from "./protected";
import ForgotPassword from "../pages/forgotPage";
import ResetPassword from "../pages/resetPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<Index />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
          theme="dark"
          style={{ fontSize: "1.2em", marginBottom: "5rem", }}
          toastStyle={{ backgroundColor: "#333" }}
          bodyStyle={{ fontSize: "1.5rem", color: "#fff" }}
          progressStyle={{ backgroundColor: "#fff" }}
        />
      </Router>
    </>
  );
};

export default App;
