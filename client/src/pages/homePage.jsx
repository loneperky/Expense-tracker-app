import { useEffect, useState } from "react";
import Transactions from "../component/transact";
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
      // window.location.reload()
      console.log(response.data);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction");
    }
  };

  const logout = async () => {  
    try {
      const response = await axios.get("http://localhost:5000/api/logout");
      if(response.status === 200) { 
        alert("Logout successful");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out");
    }
  }
  // const getAllTransactions = async () =>{
  //   const transactions = await axios.get("http://localhost:5000/api/all")  
  

  // useEffect(()=>{
  //   const getAllTransactions = async () =>{
  //     const transactions = await axios.get("http://localhost:5000/api/all")
  //     if(transactions.status){
  //       setAllTransactions(transactions.data)
  //       console.log(transactions.data)
  //     }else{
  //       console.log("could not fetch data")
  //     }
  //   }

  //   getAllTransactions()
  // },[])

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
            <button >Add New Transaction</button>
            <button>Logout</button>
          </form>
        
       
        </div>
      </main>
    </>
  );
}

export default HomePage;
{/* <div className="transactions">

           
{allTransactions.map((transaction) => (
  <Transactions class="price" key={transaction._id} title={transaction.title} amount={transaction.amount} description={transaction.description} time={transaction.time} id={transaction._id} date={transaction.date} setAllTransactions={setAllTransactions} allTransactions={allTransactions}/>
))}

</div> */}