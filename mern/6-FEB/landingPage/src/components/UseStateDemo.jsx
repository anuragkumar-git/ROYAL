import React, { useState } from 'react'

export const UseStateDemo = () => {

  // let state = 0
  // const updateState = ()=>{
  //   state++;
  //   console.log(state);
    
  // }

  const [state2, setstate] = useState(0)

    const updateState2 = () =>{
        setstate(state2+1)
        console.log(state2) ;
        
    }

  return (
    <div>
      <h1>UseStateDemo</h1>
      {/* <button onClick={updateState}>Update State</button> */}
      <button onClick={()=>{updateState2()}}> state2 </button>
       = {state2}


    </div>

  )
}
