// import { MenuItem } from "@/types/restaurantType";

// import { useCartStore } from "@/store/useCartStore";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
// import HeroImage from "@/assets/hero_pizza.png";
import { MenuItem } from "@/types/restaurant.type";
import { useCartStore } from "@/zustandStore/useCartStore";
import { toast } from "sonner";
// const menuPrice = "539 INR";
const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();

  // const menuName = "Tandoori Pizza";
  // const menuDescription ="With SSR, content is displayed quickly, which is especially beneficial for users on slow connections";
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus.map((menu: MenuItem) => (
          <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            <img src={menu.image} alt="" className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(menu);
                  toast("Succesfully, Item is added to cart");
                }}
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
