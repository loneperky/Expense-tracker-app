import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Transactions from "../component/transact";
import "../style/index.css";
import axios from "axios";

function HomePage() {
  axios.defaults.withCredentials = true
  const [amount, setName] = useState(Number);
  const [title, setStuff] = useState("");
  const [description, setDest] = useState("");
  const [time,setDate] = useState(Date)
  const [user,setUser]= useState(null)
  const [allTransactions,setAllTransactions] = useState([])

  const navigate = useNavigate()

  // useEffect(()=>{
   
  //   const getUser = async () =>{
  //     const profile = await axios.get("http://localhost:7000/api/profile" )
   
  //     if(profile.status == 200){
  //       setUser(profile.data)
  //     }
  //   }
  //   getUser()

  // },[])

  const Logout = async () =>{
    await axios.post("http://localhost:7000/auth/logout")
    alert("user logged out successfully")
    navigate("/login")
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/api/add", {
        amount,
        description,
        time,
        title
      });
      
      if(response.status === 200) { 
        alert("Transaction added successfully");
        console.log(response)
      }
      // window.location.reload()
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction");
    }
  };

  
  useEffect(()=>{
    const getAllTransactions = async () =>{
      const transactions = await axios.get("http://localhost:7000/api/all")
      if(transactions.status){
        setAllTransactions(transactions.data)
        console.log(transactions.data)
      }else{
        console.log("could not fetch data")
      }
    }

    getAllTransactions()
  },[])

  return (
    <>
      <main>
        <div className="center">
          <div className="h">
            <h1>
             
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="description">
              <input
                type="text"
                autoComplete="off"
                required
                name="title"
                onChange={(e) => setStuff(e.target.value)}
                placeholder={"title e.g Apple Watch"}
              />
            </div>
            <div className="basic">
              <input
                name="amount"
                required
                autoComplete="off"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder={"Amount spent e.g +200 or -300"}
              />
              <input type="date" required onChange={(e) => setDate(e.target.value)} name="time" id="" />
            </div>
            <div className="description">
              <input
                type="text"
                required
                autoComplete="off"
                name="description"
                onChange={(e) => setDest(e.target.value)}
                placeholder={"Description"}
              />
            </div>
            <button type="submit" >Add New Transaction</button>
          </form>
          <button onClick={Logout}>Logout</button>
          <div className="transactions">
          <h2>All Transactions here</h2>
        </div> 
        <div className="transactions">


{/* 
{allTransactions.map((expense)=> <Transactions key={expense._id} title={expense.title} amount={expense.amount} time={expense.amount} desc={expense.description} />)} */}

</div>
        </div>
       
      </main>
    
    </>
  );
}



export default HomePage;
