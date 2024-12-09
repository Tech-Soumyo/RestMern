// recoil/hooks/useRestaurantActions.ts
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { toast } from "sonner";
import {
  loadingState,
  restaurantState,
  searchedRestaurantState,
  appliedFilterState,
  singleRestaurantState,
  restaurantOrderState,
} from "./resturentAtom";
import { MenuItem } from "@/types/restaurant.type";

const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/restaurant";
axios.defaults.withCredentials = true;

export function useRestaurantActions() {
  const setLoading = useSetRecoilState(loadingState);
  const setRestaurant = useSetRecoilState(restaurantState);

  const setSearchedRestaurant = useSetRecoilState(searchedRestaurantState);
  const setAppliedFilter = useSetRecoilState(appliedFilterState);
  const setSingleRestaurant = useSetRecoilState(singleRestaurantState);
  const setRestaurantOrders = useSetRecoilState(restaurantOrderState);

  const createRestaurant = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_END_POINT}/create`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setRestaurant(response.data.restaurant);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating restaurant");
    } finally {
      setLoading(false);
    }
  };

  const getRestaurant = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_END_POINT}`);
      setRestaurant(response.data.restaurants);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error fetching restaurants"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateRestaurant = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_END_POINT}/update`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setRestaurant(response.data.restaurant);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating restaurant");
    } finally {
      setLoading(false);
    }
  };

  const searchRestaurant = async (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_END_POINT}/search`, {
        params: { searchText, searchQuery, selectedCuisines },
      });
      setSearchedRestaurant(response.data.restaurants);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error searching restaurants"
      );
    } finally {
      setLoading(false);
    }
  };

  const addMenuToRestaurant = (menu: MenuItem) => {
    setRestaurant((prev) =>
      prev ? { ...prev, menu: [...prev.menus, menu] } : null
    );
  };

  const updateMenuToRestaurant = (updatedMenu: MenuItem) => {
    setRestaurant((prev) =>
      prev
        ? {
            ...prev,
            menu: prev.menus.map((item) =>
              item._id === updatedMenu._id ? updatedMenu : item
            ),
          }
        : null
    );
  };

  const resetAppliedFilter = () => {
    setAppliedFilter([]);
  };

  const getSingleRestaurant = async (restaurantId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
      setSingleRestaurant(response.data.restaurant);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error fetching restaurant details"
      );
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_END_POINT}/orders`);
      setRestaurantOrders(response.data.orders);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const updateRestaurantOrder = async (orderId: string, status: string) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_END_POINT}/orders/${orderId}`, {
        status,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setRestaurantOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error updating order status"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    searchRestaurant,
    addMenuToRestaurant,
    updateMenuToRestaurant,
    resetAppliedFilter,
    getSingleRestaurant,
    getRestaurantOrders,
    updateRestaurantOrder,
  };
}
