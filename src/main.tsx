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
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client.ts";
import AccountLayout from "./components/layout/AccountLayout.tsx";
import Orders from "./components/account/Orders.tsx";
import Settings from "./components/account/Settings.tsx";
import Dashboard from "./Pages/admin/Dashboard.tsx";
import { AdminLayout } from "./components/layout/AdminLayout.tsx";
import ProductsManagement from "./Pages/admin/ProductsManagement.tsx";
import OrdersManagement from "./Pages/admin/OrdersManagement.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";
import OrderSuccess from "./Pages/OrderSuccess.tsx";

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
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout/success/:orderId",
    element: (
      <ProtectedRoute>
        <OrderSuccess/>
      </ProtectedRoute>
    ),
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
  {
    path: "/account",
    element: <AccountLayout />,
    children: [
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <ProductsManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrdersManagement />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
