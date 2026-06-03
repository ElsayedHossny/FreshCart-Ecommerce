import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import Electronics from "./components/Electronics/Electronics";
import Clothes from "./components/Clothes/Clothes";
import Furniture from "./components/Furniture/Furniture";
import Accessories from "./components/Accessories/Accessories";
import Mens from "./components/Mens/Mens";
import Womens from "./components/Womens/Womens";
import CounterContextProvider from "./Context/Contect";
import { UserContext } from "./Context/UserContext";
import { useContext, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";

import { Toaster } from "react-hot-toast";

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
        children: [
          { path: "electronics", element: <Electronics /> },
          {
            path: "clothes",
            element: <Clothes />,
            children: [
              { path: "", element: <Mens /> },
              { path: "womens", element: <Womens /> },
            ],
          },
          { path: "furniture", element: <Furniture /> },
          { path: "accessories", element: <Accessories /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  let { setUserToken, setNameSignIn } = useContext(UserContext);

  useEffect(() => {
    // if (localStorage.getItem("userToken") !== (null || "null")) if use SrtItem
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
      setNameSignIn(localStorage.getItem("userName"));
    }
  }, []);

  return (
    <>
      <CartContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CounterContextProvider>
      </CartContextProvider>
      <Toaster />
    </>
  );
}
