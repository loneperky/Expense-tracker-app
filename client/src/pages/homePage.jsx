import { useEffect, useState } from "react";
import "../style/index.css";
import axios from "axios";

function HomePage() {
  const [amount, setName] = useState(Number);
  const [title, setStuff] = useState("");
  const [description, setDest] = useState("");
  const [time,setDate] = useState(Date)
  const [allTransactions,setAllTransactions] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/add", {
        amount,
        description,
        time,
        title
      });
      if(response.status === 200) { 
        alert("Transaction added successfully");
      }
      if(response){
        setStuff("")
        setName("")
        setDate(null)
        setDest("")
      }
      window.location.reload()
      console.log(response.data);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction");
    }
  };

  useEffect(()=>{
    const getAllTransactions = async () =>{
      const transactions = await axios.get("http://localhost:5000/api/all")
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
              $1500<span>.00</span>
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
                placeholder={"Amount spent"}
              />
              <input type="datetime-local" required onChange={(e) => setDate(e.target.value)} name="time" id="" />
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
            <button >Add New Transaction</button>
          </form>
        
          <div className="transactions">

            <div className="transaction"> 
            <div className="left">
              <div className="name">
                <h3>{"Apple Watch"}</h3>
              </div>
              <div className="discription">
                <p>{"Decided to get in the digital trends"}</p>
              </div>
            </div>
            <div className="right ">
              <div className="price red">
                <h3>${"400"}</h3>
              </div>
              <div className="datetime">
                <p>11-04-12</p>
              </div>
            </div>
            
           </div>
          
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
