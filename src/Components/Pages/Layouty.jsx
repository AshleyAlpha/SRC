import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../Header';
import SideBar from '../Sidebar';
// import LogoutButton from '.../LogoutForm';

const Layout = () => {
  return (
    <div className=" p-3 w-full h-full">
        {/* <Header/> */}
     <div className="flex w-full">
        <SideBar/>
        <div className="flex p-3 w-full rounded-lg pl-64 pt-2">
        <Outlet/>
        </div>
     </div>
    </div>
  );
}

export default Layout