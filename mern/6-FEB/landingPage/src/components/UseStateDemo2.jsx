import react, { useState } from 'react'

export const UseStateDemo2 = () => {
    
    const [status, setStatus] = useState(true)
    const loading = () => {
        setStatus(false)
    }
    return (
        <div>
           <h1>usestateDemo2</h1> 
           {
                status == true ? "Loading... " : ""
           }
            <button onClick={ ()=>{loading()}}>stop</button>
        </div>
    )
}