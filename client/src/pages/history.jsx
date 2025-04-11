import React, { useState,useEffect } from "react";
import axios from "axios";
import '../style/history.css'
import Transactions from "../component/transact";
const History = () => {
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {

   
    const Checkhistory = async () => {
      const transactions = await axios.get("http://localhost:5000/api/all");
      if (transactions.status == 200) {
        console.log(transactions.data);
        alert("See all transactions");
         setAllTransactions(transactions.data);
      }
    };
    Checkhistory();
  }, []);

  return (
    <>
      <div className="history-table">
        {allTransactions.map(transaction =>{
          <Transactions title={transaction.title} amount={transaction.amount} time={transaction.time} description={transaction.description}/>
        })}
      </div>
    </>
  );
};

export default History;
