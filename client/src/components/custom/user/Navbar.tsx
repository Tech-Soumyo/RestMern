import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../../ui/button";
import {
  Moon,
  Sun,
  ShoppingCart,
  User,
  SquareMenu,
  UtensilsCrossed,
  PackageCheck,
  HandPlatter,
  Loader2,
  Menu,
} from "lucide-react";
import { Separator } from "../../ui/separator";

function Navbar() {
  const admin = true;
  const length = 2;
  const loading = false;

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Set the initial theme based on localStorage or default to light
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const handleThemeToggle = (newTheme: any) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl">PatelEats</h1>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>

            {admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/resturent">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun
                      className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${
                        theme === "dark" ? "dark:-rotate-90 dark:scale-0" : ""
                      }`}
                    />
                    <Moon
                      className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${
                        theme === "dark" ? "dark:rotate-0 dark:scale-100" : ""
                      }`}
                    />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleThemeToggle("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeToggle("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart />
              {length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                >
                  {length}
                </Button>
              )}
            </Link>
            <div>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="profilephoto"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {loading ? (
                <Button className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={() => {}}
                  className="bg-orange hover:bg-hoverOrange"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive */}
          <MobileNavbar handleThemeToggle={handleThemeToggle} theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

const MobileNavbar = ({ handleThemeToggle, theme }: any) => {
  const admin = true;
  const loading = false;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>PatelEats</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun
                  className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${
                    theme === "dark" ? "dark:-rotate-90 dark:scale-0" : ""
                  }`}
                />
                <Moon
                  className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${
                    theme === "dark" ? "dark:rotate-0 dark:scale-100" : ""
                  }`}
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleThemeToggle("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeToggle("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">GoodEate</h1>
          </div>
          <SheetClose asChild>
            {loading ? (
              <Button className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={() => {}}
                className="bg-orange hover:bg-hoverOrange"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
