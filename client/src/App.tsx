import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
// import MainLayout from "./MainLayout";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
// import Navbar from "./components/custom/Navbar";
import HereSection from "./components/custom/HeroSection";
import MainLayout from "./layout/MainLayout";
// import Profile from "./components/custom/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HereSection />,
      },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
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
