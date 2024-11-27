import { MenuItem } from "./restaurant.type";

export interface CartItem extends MenuItem {
  quantity: number;
}
export type CartState = {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  clearCart: () => void;
  removeFromTheCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};
