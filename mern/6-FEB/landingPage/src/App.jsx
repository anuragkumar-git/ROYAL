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
import { Demo14 } from "./components/forms/Demo14";
import { Demo14f } from "./components/forms/Demo14f";
import { Apidemo1 } from "./components/apis/Apidemo1";
import { Search } from "./components/movies/Search";
import { MovieDetail } from "./components/movies/MovieDetail";
import { Photos } from "./components/movies/Photos";
import { PostForm } from "./components/apis/PostForm";
import { Asur } from "./components/apis/Asur";

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
        <Route path="/demo14" element={<Demo14 />}></Route>
        <Route path="/demo14f" element={<Demo14f />}></Route>
        <Route path="/api" element={<Apidemo1></Apidemo1>}></Route>
        <Route path="/searchMovie" element={<Search />}></Route>
        <Route path="/moviedetail/:id" element={<MovieDetail />}></Route>
        <Route path="/photos/:id" element={<Photos />}></Route>
        <Route path="/postform" element={<PostForm/>}></Route>
        <Route path="/asur" element={<Asur/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
