import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  let navigate = useNavigate();
  let { UserToken, NameSignIn, setUserToken, setNameSignIn } = useContext(UserContext);

  let { NumOfCartItems } = useContext(UserContext);

  function handleLogOut() {    // delete localStorage
    // localStorage.setItem("userToken", null); //store as string
    // localStorage.setItem("userName", null); 
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    // delete data from variable
    setUserToken(null);
    setNameSignIn(null);
    // navigate to Login
    navigate("/login");
  }


  return (
    <>
      <nav className=" sticky-top navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="freshcart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {UserToken !== null ? <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-disabled="true" to="categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-disabled="true" to="brands">
                  Brands
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="allorders">
                  Orders
                </Link>
              </li>
            </ul> : ""}

            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {UserToken === null ?
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </> : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        target="_blank"
                        to="profile"
                      >
                        <i className="fa-regular fa-circle-user fa-xl text-main"></i>
                      </Link>
                    </li>
                    <li className="nav-item position-relative">
                      <Link className="nav-link" to="cart">
                        <i className="fa-solid fa-cart-shopping fa-xl"></i>
                        <span className="position-absolute fw-bolder top-0 end-0 badge rounded-pill bg-black" style={{ fontSize: '10px' }}>
                          {NumOfCartItems}
                        </span>
                      </Link>
                    </li>

                    <li className="nav-item" onClick={handleLogOut}>
                      <Link className="nav-link"> <button className=" btn btn-sm"> Logout<i className="fa-solid fa-right-from-bracket  fa-xl "></i></button> </Link>
                    </li>
                  </>)}
            </ul>
          </div>
        </div >
      </nav >
    </>
  );
}


{/* <span className=" font-sm">{NameSignIn.slice(0, NameSignIn.indexOf(" "))}</span>  */ }