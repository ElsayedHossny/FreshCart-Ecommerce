import React from "react";
import Style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
export default function Navbar() {
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
            <ul className="navbar-nav me-auto">
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
            </ul>
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
              <li className="nav-item">
                <Link className="nav-link">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
