import React from 'react'

const Transactions = (props) => {
  return (
<>

  <div className="transaction"> 
    <div className="left">
      <div className="name">
        <h3>{props.title}</h3>
      </div>
      <div className="discription">
        <p>{props.description}</p>
      </div>
    </div>
    <div className="right ">
      <div className="price red">
        <h3>${props.amount}</h3>
      </div>
      <div className="datetime">
        <p>{props.time}</p>
      </div>
    </div>

  </div>
</>
  )
}

export default Transactions