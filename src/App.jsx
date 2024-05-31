import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ResetPassword from "./Pages/Reset";
import UpdatePassword from "./Pages/Update";
import ProfileForm from "./Pages/Profile";
import OTP from "./Pages/OTP";
import Booking from "./Pages/Booking";
import Login from "./Pages/Login";
import DriverDashboard from "./Components/DriverDashboard";


import Layouty from "./Components/Pages/Layouty";
import Services from "./Components/Pages/Services";
import AddService from "./Components/Pages/Addservice";
import Dashboard from "./Components/Pages/Dashboard";
import Testimonials from "./Components/Pages/Testimonials";
import Customers from "./Components/Pages/Customers";
import Drivers from "./Components/Pages/Drivers";
import LogoutButton from "./Components/Pages/LogoutForm";
import Messages from "./Components/Pages/Messages";
import UpdateService from "./Components/Pages/Editservice";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/Reset" element={<ResetPassword />} />
          <Route path="/Update" element={<UpdatePassword />} />
          <Route path="/Profile" element={<ProfileForm />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/driverDashboard" element={<DriverDashboard />} />
          <Route/>


        </Route>
          <Route path="/" element={<Layouty/>}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Addservice" element={<AddService />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Drivers" element={<Drivers />} />
            <Route path="/Customers" element={<Customers />} />
            <Route path="/Testimonials" element={<Testimonials />} />
            {/* <Route path="/ServiceChart" element={<ServicesChart />} /> */}
            <Route path="/Editservice/:id" element={<UpdateService />} />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/LogoutForm" element={<LogoutButton />} />
            
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
