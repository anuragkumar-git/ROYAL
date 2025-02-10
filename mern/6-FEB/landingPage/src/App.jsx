import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Array } from './components/Array'
import { UseStateDemo } from './components/UseStateDemo'
import { UseStateDemo2 } from './components/UseStateDemo2'
import { Form } from './components/Form'

function App() {

  return (
      <div>
        {/* <Array></Array> */}
        <UseStateDemo></UseStateDemo>
        <UseStateDemo2></UseStateDemo2>
        <Form></Form>
      </div>
  )
}

export default App
