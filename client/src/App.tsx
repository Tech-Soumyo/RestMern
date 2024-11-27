import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
// import MainLayout from "./MainLayout";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
// import Navbar from "./components/custom/Navbar";
import HereSection from "./components/custom/CommonCompoNents/HeroSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/custom/CommonCompoNents/Profile";
import Search from "./components/custom/CommonCompoNents/SearchPage";
import { ResturentDetails } from "./components/custom/CommonCompoNents/ResturentDetails";
import Cart from "./components/custom/CommonCompoNents/Cart";
import Resturent from "./components/custom/admin/Resturent";
import Menu from "./components/custom/admin/Menu";
import Orders from "./components/custom/admin/Order";
import UserOrder from "./components/custom/CommonCompoNents/UserOrder";
import React, { useEffect } from "react";
import { useUserStore } from "./zustandStore/useUserStore";
import { useThemeStore } from "./zustandStore/themeStore";
import Loading from "./components/custom/CommonCompoNents/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  // Zustand User Store
  const { isAuthenticated, user, isCheckingAuth } = useUserStore();

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  if (user?.isVerified == false || undefined) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  // Zustand User Store
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  // Zustand User Store
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
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
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Resturent />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <Menu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <SignUp />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  // Zustand Theme Store
  const initializeTheme = useThemeStore((state: any) => state.initializeTheme);
  // Zustand User Store
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;
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
