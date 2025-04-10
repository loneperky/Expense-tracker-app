import { useState } from "react";
import "../style/index.css";
import axios from "axios";

function App() {
  const [title, setName] = useState("");
  const [description, setDest] = useState("");
  const [time,setDate] = useState(Date)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/add", {
        title,
        description,
        time,
      });
      if(response.status === 200) { 
        alert("Transaction added successfully");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction");
    }
    
  };

  return (
    <>
      <main>
        <div className="center">
          <div className="head">
            <h1>
              $400<span>.00</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="basic">
              <input
                name="title"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder={"+200 new Samsung Phone"}
              />
              <input type="datetime-local" onChange={(e) => setDate(e.target.value)} name="time" id="" />
            </div>
            <div className="description">
              <input
                type="text"
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
                  <h2>New Samsung Phone</h2>
                </div>
                <div className="discription">
                  <h4>It was time for a new Phone</h4>
                </div>
              </div>
              <div className="right">
                <div className="price red">
                  <h3>-$500</h3>
                </div>
                <div className="datetime">
                  <h4>{"2025-04-10 4:07am"}</h4>
                </div>
              </div>
            </div>
            <div className="transaction">
              <div className="left">
                <div className="name">
                  <h2>Gig Job new website</h2>
                </div>
                <div className="discription">
                  <h4>Developed a website for client</h4>
                </div>
              </div>
              <div className="right">
                <div className="price green">
                  <h3>+$500</h3>
                </div>
                <div className="datetime">
                  <h4>{"2025-04-10 4:07am"}</h4>
                </div>
              </div>
            </div>
            <div className="transaction">
              <div className="left">
                <div className="name">
                  <h2>New Samsung TV</h2>
                </div>
                <div className="discription">
                  <h4>Decided to get a new Tv</h4>
                </div>
              </div>
              <div className="right ">
                <div className="price red">
                  <h3>-$500</h3>
                </div>
                <div className="datetime">
                  <h4>{"2025-04-10 4:07am"}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
