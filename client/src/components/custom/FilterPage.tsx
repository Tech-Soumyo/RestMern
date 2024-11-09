import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type FilterOptionState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionState[] = [
  { id: "burgur", label: "Burgur" },
  { id: "thali", label: "Thali" },
  { id: "biriyani", label: "Biriyani" },
  { id: "momos", label: "Momos" },
];

export const FilterPage = () => {
  //  const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore();
  //  const appliedFilterHandler = (value: string) => {
  //    setAppliedFilter(value);
  //  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className=" font-medium text-lg">Filter by cuisines</h1>
        <Button variant={"link"} onClick={() => {}}>
          Reset
        </Button>
      </div>
      {filterOptions.map((options) => (
        <div key={options.id} className=" flex items-center space-x-2 my-5">
          <Checkbox />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {options.label}
          </Label>
        </div>
      ))}
    </div>
  );
};
