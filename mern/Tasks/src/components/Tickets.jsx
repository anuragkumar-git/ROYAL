import React, { useState } from "react";

// rafc: react arrow function
export const Tickets = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [sdate, setSdate] = useState()
    const [edate, setEdate] = useState()
    const [count, setCount] = useState(1)
  return (
    <div>
      <div className="form">
        <h1>Tickets</h1>
        <div>
          <label>Name</label>
          <input type="text" autoFocus onChange={(e)=>{setName(e.target.value)}}/>{name}
        </div>
        <div>
          <label>Email</label>
          <input type="email" onChange={(event)=>{setEmail(event.target.value)}}/>{email}
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" onChange={(e)=>{setSdate(e.target.value)}}/>
          {/* <DatePicker  selected={}></DatePicker> */}
        </div>
        <div>
          <label>End Date</label>
          <input type="date" onChange={(e)=>{setEdate(e.target.value)}}/>
        </div>
        <div>
          <label>Persons</label>
          <input type="number" min={1} max={6} defaultValue={1} onChange={(e)=>{setCount(e.target.value)}}/> {count}
        </div>
      </div>
    </div>
  );
};
