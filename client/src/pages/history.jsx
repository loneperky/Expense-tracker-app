import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/history.css";
import Transactions from "../component/transact";
const History = () => {
  
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const Checkhistory = async () => {
     const API_URL = 'https://expense-tracker-app-3hti.onrender.com'
      const transactions = await axios.get(`${API_URL}/api/all`)
      if (transactions.status == 200) {
        console.log(transactions.data);
        alert("See all transactions");
        setAllTransactions(transactions.data.expenses);
      }else{
        alert("there was an error")
      }
    };
    Checkhistory();
  }, []);

  return (
    <>
      <div className="title">
        <h1>Trasactions history</h1>
      </div>
      <div className="history-table">
        <div className="history-ta ble-body">
          { allTransactions && (allTransactions.map((transaction) => (
            <Transactions
              key={transaction._id}
              title={transaction.title}
              amount={transaction.amount}
              description={transaction.description}
              time={transaction.time}
              id={transaction._id}
              date={transaction.date}
            />
          )))}

          <div className="expense">
            <p>
              <Link to="/dashboard">Add new Expenses</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
