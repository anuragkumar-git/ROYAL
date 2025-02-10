import React, { useState } from 'react'

export const Form = () => {
    const [name, setName]=useState("")
    const [mail, setMail] = useState("")
    const nameHandler = (event)=>{
        console.log(event.target.value);
        setName(event.target.value)
        
    }
  return (
    <div>
        <h1>Form</h1>
        <label>Name</label>
        <input type="text" placeholder='Enter your Name' onChange={ (event)=>{nameHandler(event)}}></input>
        {/* <input type="text" placeholder='Enter your Name' onChange={ (event)=>{setName(event.target.value)}}></input> */}
        {/* {name} */}
        <label>Mail</label>
        <input type="text" placeholder='Email' onChange={(e)=>{setMail(e.target.value)}}/>{mail}
    </div>
  )
}
