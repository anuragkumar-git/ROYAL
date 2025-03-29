import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Error } from "./components/routes/Error";
import { Login } from "./components/routes/Login";
import { Signup } from "./components/routes/Signup";
import Skeleton from "./components/routes/Skeleton";
import SearchResultsPage from "./components/routes/SearchResultsPage";
import DealDetailsPage from "./components/routes/DealDetailsPage";
import BusinessRegistration from "./components/routes/business/BusinessRegistration";
import UserDashboard from "./components/routes/UserDashboard";
import AdminDashboard from "./components/routes/admin/AdminDashboard";
import AddAdvertisement from "./components/routes/AddAdvertisement";
import { DashboardOverview } from "./components/routes/business/DashboardOverview"; 
import { Card } from "./components/routes/Card";
import { Home } from "./components/routes/Home";

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
        <Route path="/deal/id:" element={<DealDetailsPage />}></Route>
        <Route path="/dealdetail" element={<DealDetailsPage />}></Route>
        <Route
          path="/businessregistration"
          element={<BusinessRegistration />}
        ></Route>
        <Route path="/card" element={<Card></Card>}></Route>
        {/* <Route path="/userdashboard" element={<UserDashboard />}></Route> */}
        {/* <Route path="/deal/:id" element={<DealDetailPage2 />} /> */}
        {/* <Route path="/businessdashboard" element={<BusinessDashboard />} />
        <Route path="/adddeal" element={<AddDealForm />} /> */}
        <Route path="/addad" element={<AddAdvertisement />} />
        {/* <Route path="/adeal" element={<ADDDEAL />} /> */}
        {/* <Route path="/businessdashboard2" element={<BusinessDashboard2 />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} ></Route> */}

        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/business/*" element={<DashboardOverview />} />
        <Route path="/user/*" element={<UserDashboard />} />
        {/* <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/ads" element={<AdManagement />} />
          <Route path="/deals" element={<DealReview />} />
          <Route path="/dealmanegment" element={<DealManagement />} /> */}

        {/* <Route path="/admin/dashboardowerview" element={<DashboardOverview />} />
        <Route path="/admin/dashboardcard" element={<DashboardCard />} /> */}
      </Routes>
    </>
  );
}

export default App;
