import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Error404 from "./pages/404";
import Unauthorized from "./pages/unauthorized";
import AddProduct from "./pages/products/AddProduct";
import AccountInfo from "./pages/accountInfo";
import Dashboard from "./pages/dashboard";
import RequireAuth from "./components/auth/requireAuth";

// Memoized Layout component for optimization
const Layout = React.memo(() => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <Navbar />
        <Outlet />
        {/* <BackButton /> */}
      </div>
    </div>
  );
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      element: <RequireAuth />, // This should wrap the layout that requires authentication
      children: [
        {
          path: "/",
          element: <Layout />, // This is your main layout component
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "add-product",
              element: <AddProduct />,
            },
            {
              path: "account-info",
              element: <AccountInfo />,
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <Error404 />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
