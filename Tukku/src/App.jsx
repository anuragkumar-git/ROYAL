import { useState } from "react";
import "./assets/css/adminlte.css";
import "./assets/css/adminlte.min.css";
import "./main.css";
import { UserSidebar } from "./components/layouts/UserSidebar";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import { Landing } from "./components/common/Landing";
import { Addoffer } from "./components/admin/Addoffer";
import { AdminSidebar } from "./components/layouts/AdminSidebar";

function App() {
  return (
    <>
      {/* <body className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
        <div className="app-wrapper"> */}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/user" element={<UserSidebar />}></Route>
        <Route path="/admin" element={<AdminSidebar />}>
          <Route path="addoffer" element={<Addoffer />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {/* <Route path="/admin/addoffer" element={<Addoffer/>}></Route> */}
      </Routes>
      {/* </div>
      </body> */}
    </>
  );
}

export default App;
