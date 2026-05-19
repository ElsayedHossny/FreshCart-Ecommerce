import React from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  let navigate = useNavigate();

  async function handleReg(formikValues) {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      formikValues,
    );
    if (data.message === "success") {
      navigate("login");
      console.log("params", data);
    } else {
      console.log("Failed");
    }
  }

  function xx(x) {
    console.log(x);
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: xx,
  });

  return (
    <>
      <div className="w-75 py-5 mx-auto">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-1">Register Now</h2>
            <p className="text-muted mb-4 small">
              Create your account to get started
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="useName" className="form-label">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                    type="text"
                    id="useName"
                    name="name"
                    placeholder="John Doe"
                  />
                  <div className="invalid-feedback">{formik.errors.name}</div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">{formik.errors.email}</div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone number
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                  />
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                    />
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="rePassword" className="form-label">
                    Confirm password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.rePassword}
                      className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? "is-invalid" : ""}`}
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      placeholder="••••••••"
                    />
                    <div className="invalid-feedback">
                      {formik.errors.rePassword}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn bg-main w-100 mt-2 text-white"
              >
                <i className="fa-solid fa-user-plus me-2"></i>Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
