import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import Electronics from './components/Electronics/Electronics';
import Clothes from './components/Clothes/Clothes';
import Furniture from './components/Furniture/Furniture';
import Accessories from './components/Accessories/Accessories';
import Mens from './components/Mens/Mens';
import Womens from './components/Womens/Womens';

let router = createBrowserRouter([
  {
    path: "", element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'brands', element: <Brands /> },
      { path: 'cart', element: <Cart /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      {
        path: 'categories', element: <Categories />, children: [
          { path: "electronics", element: <Electronics /> },
          { path: "clothes", element: <Clothes /> ,children:[
            {path:'' , element: <Mens/>},
            {path:'womens' , element: <Womens/>},
          ] },
          { path: "furniture", element: <Furniture /> },
          { path: "accessories", element: <Accessories /> },
        ]
      },
      { path: '*', element: <NotFound /> },
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
