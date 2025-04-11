import React from "react";
import '../style/settings.css'
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <>
    <div className="settings-details">
      
      <div className="account-settings">
      <div className="set">
        <h1>Settings</h1>
      </div>
        <div className="details">
          
          <div className="name">
            <img src="" alt="" />
            <h2>Full Name</h2>
          </div>

          <div className="email">
            <img src="" alt="" />
            <h3>Email@gmail.com</h3>
          </div>
          <div className="password">
            <img src="" alt="" />
            <h3>Security</h3>
          </div>

          <div className="delete">
            <h2>Delete All Expenses</h2>
            <button>Delete All Transactions</button>
          </div>

        </div>
        
        <div className="logout">
          <button>Log Out</button>
        </div>
      </div>
    </div>
     
    </>
  );
};


export default Settings;
