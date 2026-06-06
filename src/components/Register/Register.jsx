import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submithandle(formikValues) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formikValues)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      setIsLoading(false);
      navigate("/login");
    }
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationYub = Yup.object({
    name: Yup.string()
      .min(3, "Name min-length is 3")
      .max(15, "Name max-length is 15")
      .required("Name is Require"),
    email: Yup.string().email("Email is Notvaild").required("Email is Require"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone is Notvaild")
      .required("Phone is Require"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is Notvaild")
      .required("Password is Require"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("rePassword is Require"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationYub,
    onSubmit: submithandle,
  });

  let EmailInput = useRef(null);

  useEffect(() => {
    EmailInput.current.focus();
  }, [])

  return (
    <>
      <div className="w-75 py-5 mx-auto">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            {error !== null ? (
              <div className="alert alert-danger">{error}</div>
            ) : null}
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
                    ref={EmailInput}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={`form-control`}
                    type="text"
                    id="useName"
                    name="name"
                    placeholder="John Doe"
                  />
                </div>
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger mt-1 p-1">
                    {formik.errors.name}
                  </div>
                ) : null}
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
                    className={`form-control`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                  />
                </div>
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger mt-1 p-1">
                    {formik.errors.email}
                  </div>
                ) : null}
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
                    className={`form-control `}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger mt-1 p-1">
                    {formik.errors.phone}
                  </div>
                ) : null}
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
                      className={`form-control `}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="input-group-text"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-danger mt-1 p-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
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
                      className={`form-control `}
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      placeholder="••••••••"
                    />
                  </div>
                  {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div className="alert alert-danger mt-1 p-1">
                      {formik.errors.rePassword}
                    </div>
                  ) : null}
                </div>
              </div>

              {!isLoading ? (
                <button
                  disabled={!(formik.isValid && formik.dirty)} //dirty not touched in start
                  type="submit"
                  className="btn bg-main w-100 mt-2 text-white"
                >
                  <i className="fa-solid fa-user-plus me-2"></i>Create account
                </button>
              ) : (
                <button
                  className="btn bg-main w-100 mt-2 text-white "
                  disabled
                  type="button"
                >
                  <i className="fa-solid fa-spinner fa-spin fa-spin-pulse"></i>
                </button>
              )}

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
