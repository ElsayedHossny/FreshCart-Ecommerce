import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let navigate = useNavigate();
  let { setUserToken, setNameSignIn } = useContext(UserContext);

  let { setUserEmail } = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submithandle(formikValues) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formikValues)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('useremail', data.user.email);
      setNameSignIn(data.user.name);
      setUserToken(data.token);
      setUserEmail(data.user.email);
      navigate("/");
    }
  }

  let validationYub = Yup.object({
    email: Yup.string().email("Email is Notvaild").required("Email is Require"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is Notvaild")
      .required("Password is Require"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationYub,
    onSubmit: submithandle,
  });

  return (
    <>
      <div className="w-75 py-5 mx-auto">
        <div className="card shadow-sm">
          <div className="card-body p-4 pb-2">
            {error !== null ? (
              <div className="alert alert-danger">{error}</div>
            ) : null}
            <h2 className="mb-1">Login</h2>
            <p className="text-muted mb-4 small">
              Sign in to your FreshCart account
            </p>
            <form onSubmit={formik.handleSubmit}>

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

              {!isLoading ? (
                <button
                  disabled={!(formik.isValid && formik.dirty)} //dirty not touched in start
                  type="submit"
                  className="btn bg-main w-100 mt-2 text-white"
                >
                  <i className="fa-solid fa-user-plus me-2"></i>Sign in
                </button>
              ) : (
                <button
                  className="btn bg-main w-100 mt-2 text-white "
                  disabled
                  type="button"
                >
                  <i className="fa-solid fa-spinner fa-spin fa-1xl"></i>
                </button>)}
              <p className="text-center mt-4">Don't have an account? <Link className=" text-decoration-none" to={'/register'}>Create one</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
