import { useParams } from "react-router-dom";
// import HeroImage from "@/assets/hero_pizza.png";
import { Badge } from "../../ui/badge";
import { Timer } from "lucide-react";
import AvailbleMenu from "./AvailbleMenu";
import { useRestaurantStore } from "@/zustandStore/restaurantStore";
import { useEffect } from "react";
export const ResturentDetails = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!);
  }, [params.id]);
  // const deliveryTime = "30";
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant?.imageUrl || "Loading..."}
            alt="res_image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <div className="text-left">
              <h1 className="font-medium text-xl">
                {singleRestaurant?.restaurantName || "Loading..."}{" "}
              </h1>
            </div>

            <div className="flex gap-2 my-2">
              {singleRestaurant?.cuisines.map((cusine: string, idx: number) => (
                <Badge key={idx}>{cusine}</Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time:{" "}
                  <span className="text-[#D19254]">
                    {singleRestaurant?.delivaryTime + " "}
                    mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="text-left">
          {singleRestaurant?.menus && (
            <AvailbleMenu menus={singleRestaurant.menus} />
          )}
        </div>
      </div>
    </div>
  );
};
