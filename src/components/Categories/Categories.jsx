import React from 'react'
import Style from "./Categories.module.css"
import { Link, Outlet } from 'react-router-dom';
export default function Categories() {
  return (
    <div>
      <h1>Categories</h1>
      <div className="container d-flex">
        <div className="linksCategories col-md-3 bg-light p-3">
                <ul className=' d-flex flex-column gap-4 '>
                  <li><Link to="electronics">Electronics</Link></li>
                  <li><Link to="clothes">Clothes</Link></li>
                  <li><Link to="furniture">Furniture</Link></li>
                  <li><Link to="accessories">Accessories</Link></li>
                </ul>
        </div>
        <div className="col-md-6 p-4 bg-dark text-white">
          <Outlet/>
        </div>

      </div>
      </div>


  )
}
