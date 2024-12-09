import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./restaurantStore";
import { MenuState } from "@/types/menu.type";

const API_END_POINT = "http://localhost:3000/api/v1/menu";
axios.defaults.withCredentials = true;

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          // update restaurant
          // TODO: Read
          // using useRestaurantStore.getState() , we can access any thing of useRestaurantStore
          //  const updatedMenus =
          //    useRestaurantStore.getState().restaurant?.menus || [];
          //  useRestaurantStore.setState({
          //    restaurant: {
          //      ...useRestaurantStore.getState().restaurant,
          //      menus: [...updatedMenus, response.data.menu],
          //    },
          //  });
          useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Something went wrong!";
          toast.error(errorMessage);
          set({ loading: false });
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          // update restaurant menu
          useRestaurantStore
            .getState()
            .updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
