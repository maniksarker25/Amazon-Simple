import React from 'react'
import App from './App'
import './index.css'
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Orders from './components/Orders';
import OrderReview from './components/OrderReview';
import Inventory from './components/Inventory';
import Login from './components/Login';
import cartProductsLoader from './Loader/cartProductsLoader';
import Checkout from './components/Checkout';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './Providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
const router = createBrowserRouter([
  {
    path:'/',
    element:<App></App>,
    children:[
      {
        path:'/',
        element:<Shop></Shop>
      },
      {
        path:'orders',
        element:<Orders></Orders>,
        loader:cartProductsLoader
      },
      {
        path:'order review',
        element:<OrderReview></OrderReview>
      },
      {
        path:'inventory',
        element:<PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'checkout',
        element:<PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path:'signUp',
        element:<SignUp></SignUp>
      }
    ]

  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
  </React.StrictMode>,
)
