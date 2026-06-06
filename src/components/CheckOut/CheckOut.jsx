import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function CheckOut() {

  const [isLoading, setisLoading] = useState(false);
  let { CheckOutPaymentMethod } = useContext(CartContext);
  let { CartID, setNumOfCartItems } = useContext(UserContext);
  async function handleSubmitPayment(values) {
    setisLoading(true);
    let { data } = await CheckOutPaymentMethod(values, CartID ? CartID : "null", "https://freshcart-ecommerce-cyan.vercel.app");
    // console.log(data.session.url);
    if (data?.status === "success") {
      toast.success("Order placed successfully!");
      window.location.href = data.session.url;
      setNumOfCartItems(0);
    } else {
      toast.error("Something went wrong");
    }
    setisLoading(false);
  }

  let validationSchema = Yup.object({
    details: Yup.string().required('Details is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number')
      .required('Phone is required'),
    city: Yup.string().required('City is required'),
  });

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    validationSchema,
    onSubmit: handleSubmitPayment
  });

  return (
    <>
      <Helmet>
        <title>CheckOut | FreshCart</title>
      </Helmet>

      <div className="min-vh-100 py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">

              <div className="card border-0 shadow-sm rounded-3 border-top border-success border-3">
                <div className="card-body p-4">

                  <h4 className="fw-bold mb-1">Checkout</h4>
                  <p className="text-secondary small mb-4">Complete your FreshCart order</p>

                  <form onSubmit={formik.handleSubmit}>

                    {/* Details */}
                    <div className="mb-3">
                      <label htmlFor="details" className="form-label fw-semibold small">Details</label>
                      <input
                        id="details"
                        name="details"
                        type="text"
                        placeholder="Enter your address details..."
                        className={`form-control ${formik.touched.details && formik.errors.details ? 'is-invalid' : formik.touched.details ? 'is-valid' : ''}`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.details}
                      />
                      {formik.touched.details && formik.errors.details &&
                        <div className="invalid-feedback">{formik.errors.details}</div>
                      }
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold small">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. 01010700999"
                        className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : formik.touched.phone ? 'is-valid' : ''}`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                      />
                      {formik.touched.phone && formik.errors.phone &&
                        <div className="invalid-feedback">{formik.errors.phone}</div>
                      }
                    </div>

                    {/* City */}
                    <div className="mb-4">
                      <label htmlFor="city" className="form-label fw-semibold small">City</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="e.g. Cairo"
                        className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : formik.touched.city ? 'is-valid' : ''}`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                      />
                      {formik.touched.city && formik.errors.city &&
                        <div className="invalid-feedback">{formik.errors.city}</div>
                      }
                    </div>

                    {/* Submit Button */}
                    {!isLoading ? (
                      <button
                        type="submit"
                        disabled={!(formik.isValid && formik.dirty)}
                        className="btn btn-success w-100 py-2 fw-semibold"
                      >
                        <i className="fa-solid fa-credit-card me-2"></i>Payment
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="btn btn-success w-100 py-2 fw-semibold"
                      >
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>Processing...
                      </button>
                    )}

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
