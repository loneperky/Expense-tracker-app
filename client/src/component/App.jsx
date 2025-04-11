import React from "react";
import HomePage from "../pages/homePage";
import History from "../pages/history";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "./Navbar";
import Settings from "../pages/settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
      <Navbar />
         <Routes>
          <Route path ="/" element={<HomePage />}/>
          <Route path ="/transactions/history" element={<History />}/>
          <Route path ="/*" element={<ErrorPage />}/>
        </Routes>
      </Router>
    </>
  )
};

export default App;
