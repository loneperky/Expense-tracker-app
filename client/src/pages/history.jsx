import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="title">
      <h1>Trasactions history</h1>
    </div>
      <div className="history-table">

        <div className="history-table-body">
          {allTransactions.map((transaction) => (
            <Transactions key={transaction._id} title={transaction
              .title} amount={transaction.amount} description={transaction.description} time={transaction.time} id={transaction._id} date={transaction.date} setAllTransactions={setAllTransactions} allTransactions={allTransactions
            }/>
          ))}
           <div className="expense">
          <p>
          <Link to="/">Add new Expenses</Link>
          </p>
         </div>
        </div>
      </div>
    </>
  );
};

export default History;
