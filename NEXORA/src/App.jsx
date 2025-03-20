import axios from "axios";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/routes/Home";
import { Error } from "./components/routes/Error";
import { Login } from "./components/routes/Login";
import { Signup } from "./components/routes/Signup";
import { Products } from "./components/routes/Products";
import Skeleton from "./components/routes/Skeleton";
import LandingPage from "./components/routes/LandingPage";
import SearchResultsPage from "./components/routes/SearchResultsPage";
import HomePage from "./components/routes/HomePage";
import DealDetailsPage from "./components/routes/DealDetailsPage";
import BusinessRegistration from "./components/routes/BusinessRegistration";
import UserDashboard from "./components/routes/UserDashboard";
import DealDetailPage2 from "./components/routes/DealDetailPage2";
import BusinessDashboard from "./components/routes/BusinessDashboard";
import AddDealForm from "./components/routes/AddDealForm";
import BusinessDashboard2 from "./components/routes/BusinessDashboard2";
import AdminDashboard from "./components/routes/adminDashboard/AdminDashboard";
import DashboardOverview from "./components/routes/adminDashboard/DashboardOverview";
import DashboardCard from "./components/routes/adminDashboard/DashboardCard";
import AddAdvertisement from "./components/routes/AddAdvertisement";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <>
      <Navbar></Navbar>

      <Routes>
        {/* <Route path="/" element={<HomePage/>}></Route> */}
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/*" element={<Error />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/skeleton" element={<Skeleton />}></Route>
        <Route path="/search" element={<SearchResultsPage />}></Route>
        <Route path="/dealdetail" element={<DealDetailsPage />}></Route>
        <Route
          path="/businessregistration"
          element={<BusinessRegistration />}
        ></Route>
        <Route path="/userdashboard" element={<UserDashboard />}></Route>
        {/* <Route path="/deal/:id" element={<DealDetailPage2 />} /> */}
        <Route path="/businessdashboard" element={<BusinessDashboard />} />
        <Route path="/adddeal" element={<AddDealForm />} />
        <Route path="/addad" element={<AddAdvertisement />} />
        {/* <Route path="/businessdashboard2" element={<BusinessDashboard2 />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} ></Route> */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        {/* <Route path="/admin/dashboardowerview" element={<DashboardOverview />} />
        <Route path="/admin/dashboardcard" element={<DashboardCard />} /> */}
      </Routes>
    </>
  );
}

export default App;
