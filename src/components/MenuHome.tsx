import React from "react";
import { Separator } from "./ui/separator";
import { menus } from "../utils/constants";
import Link from "next/link";
import Image from "next/image";
import { CircleArrowDown } from "lucide-react";

const MenuHome = ({ theme }: { theme: string }) => {
  return (
    <>
      <div
        id="menu"
        className={` flex flex-col items-center p-10 pt-[22vw] sm:pt-[15vw] md:pt-[12vw] lg:pt-[8vw] gap-16 ${
          theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#f8f1e3]"
        }`}
      >
        <div className="flex-col flex-center gap-10">
          <div className="flex-center gap-8 w-full">
            <Separator
              className={`inline w-0 sm:w-[20vw] ${
                theme === "dark" ? "bg-white" : "bg-black"
              }`}
            />
            <h2 className="text-5xl sm:text-6xl font-serif font-semibold text-center leading-[55px]">
              Explore the Culinary Delights
            </h2>
            <Separator
              className={`inline w-0 sm:w-[20vw] ${
                theme === "dark" ? "bg-white" : "bg-black"
              }`}
            />
          </div>

          <p className="text-slate-400">Enjoy the taste of perfection.</p>
          <p className="md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
            Discover a world of flavors with our carefully curated menu,
            designed to delight your taste buds. Each dish is crafted with the
            freshest ingredients, blending traditional recipes with modern
            twists to create an unforgettable dining experience. Whether
            you&apos;re craving classic favorites or adventurous new tastes, our
            culinary offerings promise to satisfy every palate. Join us and
            embark on a gastronomic journey that celebrates the art of fine
            dining.
          </p>
        </div>

        <div className="flex-center flex-wrap w-full gap-8 gap-x-20">
          {menus.map((menu, index) => (
            <div key={index} className={`w-full md:w-[35%] relative`}>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="block font-semibold">{menu.title}</span>
                </div>
                <div className="flex items-center justify-start relative">
                  <span className="text-slate-400 flex-grow relative overflow-hidden">
                    ........
                  </span>
                  <span className="text-slate-400 relative z-10 ml-2 font-semibold">
                    {menu.price}
                  </span>
                </div>
              </div>
              <p className="text-slate-400 pb-1">{menu.ingredients}</p>
              <Separator className="h-[2px] bg-slate-700/50" />
            </div>
          ))}
        </div>
        <Link href={"/menu"}>
          <button
            className={`p-2 rounded-md overflow-hidden relative cursor-pointer duration-500 shadow-md
              ${
                theme === "dark"
                  ? "hover:bg-white focus:bg-white hover:text-black focus:text-black border-white border-2 hover:shadow-[#ffffffbf]"
                  : "hover:bg-black focus:bg-black hover:text-white focus:text-white border-black border-2 hover:shadow-[#000000bf]"
              }
            `}
          >
            View the entire Menu
          </button>
        </Link>
      </div>
      <div className="w-full min-h-[50vh] relative">
        <Image
          src={"/images/special-menu.png"}
          fill
          sizes="auto"
          style={{ objectFit: "cover" }}
          alt="special menu"
          className={``}
        ></Image>

        <div
          className={`absolute w-full h-full flex flex-col items-start justify-center p-10 gap-6   ${
            theme === "dark" ? " bg-[#0000003d]" : " bg-[#ffffff59]"
          }`}
        >
          <span className="font-semibold text-xl lg:text-5xl">
            Signature Menu
          </span>
          <p className="w-[50vw] md:w-[40vw] text-xs md:text-lg">
            Indulge in our Chef&apos;s Specials, where culinary artistry meets
            the finest ingredients. Each dish is a masterpiece, crafted to
            perfection and designed to tantalize your taste buds. Experience the
            essence of our kitchen&apos;s creativity and passion in every bite.
          </p>
          <div className="w-full flex flex-col items-start sm:hidden">
            <div className="min-w-[50%] flex-center flex-col">
              <Separator
                className={`w-full ${
                  theme === "dark" ? "bg-white" : "bg-black"
                }`}
              />
              <Link
                href="#team"
                className="relative motion-svg flex font-semibold pt-8"
              >
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

        <div className="absolute w-full h-full hidden sm:flex items-center justify-end pr-[5%] gap-[5%] md:pr-[20%] md:gap-[10%]">
          <Separator
            orientation="vertical"
            className={`h-[50%] ${theme === "dark" ? "bg-white" : "bg-black"}`}
          />
          <Link
            href="#team"
            className="relative motion-svg flex font-semibold pt-8"
          >
            <CircleArrowDown
              size={50}
              absoluteStrokeWidth
              className="inline mr-2"
            />
            Scroll Down
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuHome;
