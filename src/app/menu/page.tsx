"use client";

import Loading from "@/src/components/Loading";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import {
  CircleArrowDown,
  ShoppingCartIcon,
  SquareMinus,
  SquarePlus,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { ScrollArea } from "@/src/components/ui/scroll-area";

import { menuFilter, menuItems } from "@/src/utils/constants";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import MenuItem from "@/src/components/MenuItem";
import Cart from "@/src/components/Cart";

interface CartInterface {
  image: string;
  name: string;
  tags: string[];
  quantity: number;
  price: number;
}

const MenuPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState("all");
  const [cart, setCart] = useState<CartInterface[]>([]);
  const [netTotal, setNetTotal] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full pt-[15vh] pb-[5vh] relative ">
        <Image
          src={"/images/menu-bg.png"}
          alt="bg"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className={`absolute ${theme === "dark" ? "brightness-[0.7]" : ""}`}
          priority
        />
        <div className="h-full left-0 right-0">
          <div className="flex-center flex-col gap-10 relative h-full">
            <div
              className={`flex-center flex-col backdrop-blur-[5px] p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
                theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
              }`}
            >
              <h1 className="font-extrabold text-4xl lg:text-6xl">
                Delightful Dishes
              </h1>
            </div>
            <div
              className={`flex-center flex-col backdrop-blur-[5px] p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
                theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
              }`}
            >
              <h6 className="sm:font-semibold text-sm sm:text-lg lg:text-xl">
                Curate your culinary experience.
              </h6>
            </div>
            <div className="w-1 h-40">
              <Separator
                orientation="vertical"
                className={`${theme === "dark" ? "bg-white" : "bg-black"}`}
              />
            </div>
            <Link href="#menu" className="motion-svg flex font-semibold z-10">
              <CircleArrowDown
                size={50}
                absoluteStrokeWidth
                className="inline mr-2"
              />
              Scroll Down
            </Link>
          </div>
        </div>
      </div>

      <div
        id="menu"
        className={`w-full flex flex-col items-center pt-[22vw] sm:pt-[15vw] md:pt-[12vw] lg:pt-[8vw] gap-16 ${
          theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#e0d7d2]"
        }`}
      >
        <div className="flex-col flex-center gap-10">
          <div className="flex-center md:gap-8 w-full">
            <Separator
              className={`inline w-0 sm:w-[20vw] ${
                theme === "dark" ? "bg-white" : "bg-black"
              }`}
            />
            <h2 className="text-5xl sm:text-6xl font-serif font-semibold text-center leading-[55px]">
              Our Selection
            </h2>
            <Separator
              className={`inline w-0 sm:w-[20vw] ${
                theme === "dark" ? "bg-white" : "bg-black"
              }`}
            />
          </div>

          <p className="text-slate-400 text-center">
            Discover flavors that excite.
          </p>
          <p className="w-[90%] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
            Indulge in our curated culinary selections, where every dish is
            crafted to perfection. Our menu offers a diverse range of flavors,
            ensuring there&apos;s something to satisfy every palate. From
            classic favorites to innovative creations, each item is prepared
            with the finest ingredients and utmost care. Join us for an
            unforgettable dining experience that celebrates the art of food.
            Discover the delicious possibilities that await you with every bite.
          </p>
        </div>

        <div
          className="w-[90%] flex items-center flex-wrap gap-y-3
         gap-[3%]"
        >
          {menuFilter.map((filter, index) => (
            <Button
              key={index}
              variant={"outline"}
              onClick={() => setAppliedFilter(filter)}
              className={`capitalize ${
                appliedFilter === filter && theme === "dark"
                  ? "bg-white text-black hover:text-black hover:bg-[#ffffffbc]"
                  : appliedFilter === filter
                  ? "bg-white border-white text-black"
                  : theme !== "dark"
                  ? "border-black text-black bg-transparent"
                  : "text-white border-white bg-transparent hover:invert"
              } text-start`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="w-[90%] flex-wrap flex items-center justify-around gap-y-10 pb-16">
          {(appliedFilter === "all" &&
            menuItems.map((item, index) => (
              <MenuItem
                theme={theme!}
                menuItem={item}
                key={index}
                clickFunc={() => {
                  const existingItem = cart.find(
                    (cartItem) => cartItem.name === item.name
                  );
                  if (existingItem) {
                    existingItem.quantity++;
                    const newCart = [...cart];
                    setCart(newCart);
                  } else {
                    setCart([
                      ...cart,
                      {
                        name: item.name,
                        image: item.image,
                        quantity: 1,
                        price: item.price,
                        tags: item.tags,
                      },
                    ]);
                  }
                  setNetTotal((prev) => prev + item.price);
                }}
              />
            ))) ||
            menuItems
              .filter((item) => item.tags.includes(appliedFilter))
              .map((item, index) => (
                <MenuItem
                  theme={theme!}
                  menuItem={item}
                  key={index}
                  clickFunc={() => {
                    const existingItem = cart.find(
                      (cartItem) => cartItem.name === item.name
                    );
                    if (existingItem) {
                      existingItem.quantity++;
                      const newCart = [...cart];
                      setCart(newCart);
                    } else {
                      setCart([
                        ...cart,
                        {
                          name: item.name,
                          image: item.image,
                          quantity: 1,
                          price: item.price,
                          tags: item.tags,
                        },
                      ]);
                    }
                    setNetTotal((prev) => prev + item.price);
                  }}
                />
              ))}
        </div>
      </div>

      <Cart theme={theme!} cart={cart} setCart={setCart} netTotal={netTotal} setNetTotal={setNetTotal} />
    </>
  );
};

export default MenuPage;
