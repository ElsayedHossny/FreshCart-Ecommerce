import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/freshcart-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-light p-5 border-top mt-4">
      <div className="container">
        <Link className=" navbar-brand" to="">
          <img src={logo} alt="freshcart" />
        </Link>
      </div>

      <div className="container p-3">
        {/* App Download Section */}
        <div className="row align-items-center mb-3">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold mb-1">Get the FreshCart app</h6>
            <p className="text-secondary small mb-0">We will send you Link link, open it on your phone to download the app.</p>
          </div>
          <div className="col-12 col-md-8">
            <div className="d-flex gap-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email .."
              />
              <button className="btn text-white fw-semibold text-nowrap" style={{ backgroundColor: 'var(--main-color, #0aad0a)' }}>
                Share App Link
              </button>
            </div>
          </div>
        </div>

        <hr className="text-secondary" />

        {/* Bottom Row */}
        <div className="row align-items-center">

          {/* Payment Partners */}
          <div className="col-12 col-md-6 d-flex align-items-center gap-3 mb-3 mb-md-0 flex-wrap">
            <span className="fw-semibold small">Payment Partners</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Pay" height="18" style={{ objectFit: 'contain' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" height="28" style={{ objectFit: 'contain' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" height="28" style={{ objectFit: 'contain' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" height="22" style={{ objectFit: 'contain' }} />
          </div>

          {/* App Store Links */}
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end gap-2 flex-wrap">
            <span className="text-secondary small me-1">Get deliveries with FreshCart</span>
            <Link href="#" className="d-inline-block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                alt="App Store"
                height="36"
                style={{ objectFit: 'contain' }}
              />
            </Link>
            <Link href="#" className="d-inline-block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
                height="36"
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}