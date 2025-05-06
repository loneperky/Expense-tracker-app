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

  const navigate = useNavigate();
  const API_URL = 'https://expense-tracker-app-3hti.onrender.com'
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
    alert("user logged out successfully");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      amount.trim();
      title.trim();
      description.trim();
      time.trim().toLocaleUpperCase();
      if (!amount || !title || !description || !time) {
        alert("Please fill in all fields");
        return;
      }
      if (isNaN(amount)) {
        alert("Amount must be a number");
        return;
      }
      if (amount < 0) {
        alert("Amount cannot be negative");
        return;
      }
      if (title.length < 3) {
        alert("Title must be at least 3 characters long");
        return;
      }
      if (description.length < 5) { 
        alert("Description must be at least 5 characters long");
        return;
      }
      const response = await axios.post(`${API_URL}/api/add`, {
        amount,
        description,
        time,
        title,
      });
      if (response.status === 200) {
        alert("Transaction added successfully");
        console.log(response);
        toast.success("Transaction added successfully");
      }
      // window.location.reload()
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction");
    }
  };

  useEffect(() => {
    const getAllTransactions = async () => {
      const transactions = await axios.get(`${API_URL}/api/all`);
      if (transactions.status) {
        setAllTransactions(transactions.data.expenses);
        console.log(transactions.data);
      } else {
        console.log("could not fetch data");
      }
    };
    getAllTransactions();
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
                placeholder={"Amount spent e.g +200 or -300"}
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
          <button onClick={Logout}>Logout</button>
          <div className="transactions">
            <h2>All Transactions here</h2>
          </div>
          <div className="transactions">
            { allTransactions ? allTransactions.map((transaction) => (
              <Transactions
                key={transaction._id}
                amount={transaction.amount}
                title={transaction.title}
                description={transaction.description}
                time={transaction.time}
              />
            )) : null}
          </div>
          <p> <Link to="/transactions">Transaction history</Link> </p>
        </div>
      </main>
    </>
  );
}

export default HomePage;
