import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';



// import { Offline } from "react-detect-offline";
import useNetwork from '../../Hooks/useNetwork';

// const App = () => (
//   <div>
//     <Online>Only shown when you're online</Online>
//     <Offline>Only shown offline (surprise!)</Offline>
//   </div>
// );



export default function Layout() {


  let networkCheck = useNetwork();

  return (
    <>
      <Navbar />
      <div className="container">
        {networkCheck}
        {/* <Offline>
          <div className=" network position-fixed p-3 bg-white shadow-lg z-2 text-danger fw-bold">
            <i className="fa-solid fa-wifi"></i> Network Not Connect
          </div>
        </Offline> */}
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  )
}
