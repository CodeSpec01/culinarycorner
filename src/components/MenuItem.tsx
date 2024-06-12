import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface MenuItemInterface {
  image: string;
  name: string;
  tags: string[];
  description: string;
  price: number;
}

const MenuItem = ({
  theme,
  menuItem,
  clickFunc,
}: {
  theme: string;
  menuItem: MenuItemInterface;
  clickFunc: () => void;
}) => {
  return (
    <Card
      className={`w-full sm:w-[70%] md:w-[60%] lg:w-[40%] shadow-[0_0_10px_rgba(0,0,0,0.6)] ${
        theme === "dark" ? "bg-[#333337d4]" : "bg-[#f6f6f6]"
      }`}
    >
      <CardHeader className="flex-col flex gap-4">
        <div className="w-full h-[30vh] relative ">
          <Image
            src={menuItem.image}
            alt="food item"
            fill
            sizes="auto"
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="absolute rounded-tr-[10px] rounded-tl-[10px] "
          />
        </div>
        <CardTitle>
          <div className="flex flex-col space-y-1.5">
            <p
              id="name"
              className={`bg-transparent font-serif text-3xl sm:text-5xl ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
              {menuItem.name}
            </p>
          </div>
        </CardTitle>
        <div className="flex items-center justify-start gap-3">
          {menuItem.tags.map((tag, index) => (
            <Badge
              variant={"outline"}
              className={` capitalize ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
              key={index}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <p
                id="name"
                className={`bg-transparent ${
                  theme === "dark" ? "border-white" : "border-black"
                }`}
              >
                {menuItem.description}
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg sm:text-3xl text-green-500 font-semibold">
          Rs. {menuItem.price}
        </p>
        <Button className="text-lg sm:text-xl " onClick={clickFunc}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
