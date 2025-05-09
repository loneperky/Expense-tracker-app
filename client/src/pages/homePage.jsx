import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "../component/transact";
import "../style/index.css";
import axios from "axios";

function HomePage() {
  axios.defaults.withCredentials = true;
  const [amount, setName] = useState(Number);
  const [title, setStuff] = useState("");
  const [description, setDest] = useState("");
  const [time, setDate] = useState(Date);
  const [user, setUser] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const API_URL = 'https://expense-tracker-app-3hti.onrender.com'

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`; // MM-DD-YYYY
  };
  const formattedDate = formatDate(time.trim());


  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/profile`, {
          withCredentials: true,
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  // if(!user) return navigate("/login")

  const Logout = async () => {
    await axios.post(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
    toast.success("Logout successful");
    navigate("/login");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      amount.trim();
      title.trim();
      description.trim();
      time: formattedDate.trim();
      if (!amount || !title || !description || !time) {
        toast.error("Please fill in all fields");
        return;
      }
      if (isNaN(amount)) {
        toast.error("Amount must be a number");
        return;
      }
      if (amount < 0) {
        toast.error("Amount must be a positive number");
        return;
      }
      if (title.length < 3) {
        toast.error("Title must be at least 3 characters long");
        return;
      }
      if (description.length < 5) { 
       toast.error("Description must be at least 5 characters long");
        return;
      }
      const response = await axios.post(`${API_URL}/api/add`, {
        amount,
        description,
        time:formattedDate,
        title,
      },);
      if (response.status === 200) {
        toast.success("Transaction added successfully");
        console.log(response);
        setName("");
        setStuff("");
        setDest("");
        setDate("");
      }else{
        toast.error("Transaction not added");
        console.log(response);
      }
      // window.location.reload()
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    }
  };

  useEffect(() => {
    const Checkhistory = async () => {
     const API_URL = 'https://expense-tracker-app-3hti.onrender.com'
      const transactions = await axios.get(`${API_URL}/api/all`)
      if (transactions.status == 200) {
        console.log(transactions.data);
       
        setAllTransactions(transactions.data.expenses);
      }else{
        toast.error("there was an error");
      }
    };
    Checkhistory();
  }, []);

  return (
    <>
      <main>
        <div className="center">
          <div className="h">
            {user && (
              <h2> Welcome {user.fullname} </h2>
            )}
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
                placeholder={"Amount spent e.g -200"}
              />
              <input
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
                name="time"
                id=""
              />
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
            <button type="submit">Add New Transaction</button>
          </form>
          <button className="btn" onClick={Logout}>Logout</button>
          <div className="transactions">
            <h2>All Transactions here</h2>
          </div>
          <div className="transactions">
           {Array.isArray(allTransactions) && allTransactions.length > 0 ? (
          allTransactions.map((transaction) => (
          <Transactions
            key={transaction._id}
            amount={transaction.amount}
            title={transaction.title}
            description={transaction.description}
            time={transaction.time}
          />
        ))
      ) : (
        <p>No transactions found.</p>
      )}
      </div>
          <p> <Link to="/transactions">Transaction history</Link> </p>
        </div>
      </main>
    </>
  );
}

export default HomePage;
