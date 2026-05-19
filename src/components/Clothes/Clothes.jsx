import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Clothes() {
  return (
    <>
      <div className="container d-flex">
        <div className="linksCategories col-md-3 bg-light p-3">
          <ul className=" d-flex flex-column gap-4 ">
            <li>
              <Link to={""}>Mens</Link>
            </li>
            <li>
              <Link to={"womens"}>Womens</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-6 p-4 bg-danger text-white">
          <Outlet />
        </div>
      </div>
    </>
  );
}
