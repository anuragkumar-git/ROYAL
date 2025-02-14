import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Array } from "./components/Array";
import { UseStateDemo } from "./components/UseStateDemo";
import { UseStateDemo2 } from "./components/UseStateDemo2";
import { Form } from "./components/Form";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/tukku/Home";
import { Deals } from "./components/tukku/Deals";
import { Error } from "./components/tukku/Error";
import { Landing } from "./components/tukku/Landing";
import { View } from "./components/tukku/View";
import { Login } from "./components/forms/Login";
import { Signup } from "./components/tukku/Signup";
import { Schedule } from "./components/tukku/Schedule";

function App() {
  return (
    <div>
      {/* <Array></Array> */}
      {/* <UseStateDemo></UseStateDemo>
        <UseStateDemo2></UseStateDemo2>
        <Form></Form> */}
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/*" element={<Error />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/deals" element={<Deals />}></Route>
        <Route path="/deals/:id" element={<View />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/schedule" element={<Schedule />}></Route>
      </Routes>
    </div>
  );
}

export default App;
