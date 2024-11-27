// recoil/atoms/restaurantAtoms.ts
import { Orders } from "@/types/order.type";
import { RestaurantState } from "@/types/restaurant.type";
import { atom } from "recoil";
import { persistState } from "../persistState";

// Atoms for the state
export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});

export const restaurantState = atom<RestaurantState["restaurant"] | null>({
  key: "restaurantState",
  default: null,
  effects: [persistState("restaurant-name")],
});

export const searchedRestaurantState = atom<
  RestaurantState["searchedRestaurant"] | null
>({
  key: "searchedRestaurantState",
  default: null,
  effects: [persistState("searched-restaurant")],
});

export const appliedFilterState = atom<string[]>({
  key: "appliedFilterState",
  default: [],
  effects: [persistState("applied-filter")],
});

export const singleRestaurantState = atom<
  RestaurantState["singleRestaurant"] | null
>({
  key: "singleRestaurantState",
  default: null,
  effects: [persistState("single-restaurant")],
});

export const restaurantOrderState = atom<Orders[]>({
  key: "restaurantOrderState",
  default: [],
  effects: [persistState("restaurant-order")],
});
