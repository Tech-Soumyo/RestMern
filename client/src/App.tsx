import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
// import MainLayout from "./MainLayout";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
// import Navbar from "./components/custom/Navbar";
import HereSection from "./components/custom/user/HeroSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/custom/user/Profile";
import Search from "./components/custom/user/SearchPage";
import { ResturentDetails } from "./components/custom/user/ResturentDetails";
import Cart from "./components/custom/user/Cart";
import Resturent from "./components/custom/admin/Resturent";
import Menu from "./components/custom/admin/Menu";
import Orders from "./components/custom/admin/Order";
import UserOrder from "./components/custom/user/UserOrder";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HereSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:id",
        element: <Search />,
      },
      {
        path: "/restaurant/:id",
        element: <ResturentDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <UserOrder />,
      },
      //  {
      //   path: "/order/status",
      //   element: <Success />,
      // },

      // Admin page
      {
        path: "/admin/resturent",
        element: <Resturent />,
      },
      {
        path: "/admin/menu",
        element: <Menu />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
]);

function App() {
  return (
    <>
      <main>
        <RouterProvider router={appRouter}></RouterProvider>
        {/* <Login /> */}
      </main>
    </>
  );
}

export default App;
