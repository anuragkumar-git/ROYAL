import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/routes/Home";
import { Error } from "./components/routes/Error";
import { Login } from "./components/routes/Login";
import { Signup } from "./components/routes/Signup";
function App() {
  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/home" element={<Home/>} ></Route>
        <Route path="/*" element={<Error/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </>
  );
}

export default App;
