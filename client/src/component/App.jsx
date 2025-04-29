import React from "react";
import HomePage from "../pages/homePage";
import History from "../pages/history";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "./Navbar";
import '../style/home.css'
import Index from "../pages/Index";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import ProtectedRoute from "./protected";
import ForgotPassword from "../pages/forgotPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
      <Navbar />
         <Routes>
         <Route path ="/dashboard" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
            }/>
          <Route path ="/register" element={<SignUp />}/>
          <Route path ="/" element={<Index/>}/>
          <Route path ="/login" element={<SignIn />}/>
          <Route path ="/forgot-password" element={<ForgotPassword />}/>
          <Route path ="/transactions" element={ 
            <ProtectedRoute>
             <History />
            </ProtectedRoute>
            }/>

          <Route path ="/*" element={<ErrorPage />}/>
        </Routes>
      </Router>
    </>
  )
};

export default App;
