import React from 'react'
import Style from "./NotFound.module.css"

import img from "../../images/error.svg"
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='container mt-3 d-flex flex-column justify-content-center align-items-center'>
      <img src={img} alt="" />
      <div className="text-center mt-4">
        <h2 className="fw-bold">Oops! Page Not Found</h2>
        <p className="text-muted">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className=" mt-2">
          <button className='btn bg-main text-white px-4 py-2'>Back to Home</button>
        </Link>
      </div>
    </div>
  )
}
