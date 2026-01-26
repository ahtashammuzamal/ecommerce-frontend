import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout.tsx";
import Home from "./Pages/Home.tsx";
import Products from "./Pages/Products.tsx";
import Cart from "./Pages/Cart.tsx";
import ProductDetails from "./components/shop/ProductDetails.tsx";
import AuthLayout from "./components/layout/AuthLayout.tsx";
import Register from "./Pages/Auth/Register.tsx";
import Login from "./Pages/Auth/Login.tsx";
import Checkout from "./Pages/Checkout.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
