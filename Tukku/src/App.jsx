import { useState } from "react";
import "./assets/css/adminlte.css";
import "./assets/css/adminlte.min.css";
import "./main.css"
import { UserSidebar } from "./components/layouts/UserSidebar";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";

function App() {
  return (
    <>
      {/* <body className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
        <div className="app-wrapper"> */}
          <Routes>
            <Route path="/user" element={<UserSidebar />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        {/* </div>
      </body> */}
    </>
  );
}

export default App;
