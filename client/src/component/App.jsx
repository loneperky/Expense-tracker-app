import React from "react";
import HomePage from "../pages/homePage";
import History from "../pages/history";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "./Navbar";
import Index from "../pages/Index";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
      <Navbar />
         <Routes>
          <Route path ="/" element={<Index />}/>
          <Route path ="/dashboard" element={<HomePage />}/>
          <Route path ="/register" element={<SignUp />}/>
          <Route path ="/login" element={<SignIn />}/>
          <Route path ="/transactions/history" element={<History />}/>
          <Route path ="/*" element={<ErrorPage />}/>
        </Routes>
      </Router>
    </>
  )
};

export default App;
