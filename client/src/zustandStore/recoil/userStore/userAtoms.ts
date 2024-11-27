// recoil/atoms/userAtoms.ts
import { atom } from "recoil";
import { persistState } from "../persistState";
export type User = {
  fullName: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};
export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects: [persistState("user-name")],
});

export const isAuthenticatedState = atom<boolean>({
  key: "isAuthenticatedState",
  default: false,
  effects: [persistState("is-authenticated")],
});

export const isCheckingAuthState = atom<boolean>({
  key: "isCheckingAuthState",
  default: true,
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});
