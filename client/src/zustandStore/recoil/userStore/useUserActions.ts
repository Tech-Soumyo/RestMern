// recoil/hooks/useUserActions.ts
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { toast } from "sonner";
import {
  userState,
  isAuthenticatedState,
  isCheckingAuthState,
  loadingState,
} from "./userAtoms";
import { LoginInputState, SignupInputState } from "@/schema/user.schema";

const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/user";
axios.defaults.withCredentials = true;

export const useUserActions = () => {
  const setUser = useSetRecoilState(userState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setIsCheckingAuth = useSetRecoilState(isCheckingAuthState);
  const setLoading = useSetRecoilState(loadingState);

  const signup = async (input: SignupInputState) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_END_POINT}/signup`, input, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (input: LoginInputState) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (verificationCode: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_END_POINT}/verify-email`,
        { verificationCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const checkAuthentication = async () => {
    try {
      setIsCheckingAuth(true);
      const response = await axios.get(`${API_END_POINT}/check-auth`);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_END_POINT}/logout`);
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_END_POINT}/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send password reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_END_POINT}/reset-password/${token}`,
        { newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (input: any) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_END_POINT}/profile/update`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    login,
    verifyEmail,
    checkAuthentication,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
  };
};
