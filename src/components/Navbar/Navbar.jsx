import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  let navigate = useNavigate();
  let { UserToken, NameSignIn, setUserToken, setNameSignIn } = useContext(UserContext);


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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                <Link className="nav-link" to="cart">
                  Cart
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
            </ul> : ""}

            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  target="_blank"
                  to="https://www.facebook.com/elsayed.hossny.56"
                >
                  <i className="fa-brands fa-facebook  fa-lg "></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  target="_blank"
                  to="https://www.facebook.com/elsayed.hossny.56"
                >
                  <i className="fa-brands fa-twitter fa-lg "></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  target="_blank"
                  to="https://www.facebook.com/elsayed.hossny.56"
                >
                  <i className="fa-brands fa-instagram fa-lg "></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  target="_blank"
                  to="https://www.facebook.com/elsayed.hossny.56"
                >
                  <i className="fa-brands fa-tiktok fa-lg"></i>
                </Link>
              </li>

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
                </> : <li className="nav-item" onClick={handleLogOut}>
                  <Link className="nav-link"> Hello,<span className=" font-sm">{NameSignIn.slice(0, NameSignIn.indexOf(" "))}</span> <i className="fa-solid fa-right-from-bracket"></i> </Link>
                </li>}
            </ul>
          </div>
        </div>
      </nav >
    </>
  );
}


