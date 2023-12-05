import { AdminLayout } from "@/components";
import {
  Dashboard,
  Home,
  LoginAdmin,
  NotFound,
  Product,
  ProductCategory,
  ProductVariant,
  Transaction,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";

export const router = createBrowserRouter([
  {
    element: <AuthenticatedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin/login",
        element: <LoginAdmin />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "product-category",
            element: <ProductCategory />,
          },
          {
            path: "product-variant",
            element: <ProductVariant />,
          },
          {
            path: "transaction",
            element: <Transaction />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
