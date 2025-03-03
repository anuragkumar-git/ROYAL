import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/routes/Home";
import { Error } from "./components/routes/Error";
import { Login } from "./components/routes/Login";
import { Signup } from "./components/routes/Signup";
import axios from "axios";
import { Products } from "./components/routes/Products";
import Skeleton from "./components/routes/Skeleton";
function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/*" element={<Error />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/skeleton" element={<Skeleton/>}></Route>
      </Routes>
    </>
  );
}

export default App;
