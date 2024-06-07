import Image from "next/image";
import React from "react";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { CircleArrowDown } from "lucide-react";

const Hero = ({ theme }: { theme: string }) => {
  return (
    <div className="relative h-screen">
      <div className="h-full -z-10 absolute inset-0">
        <Image
          src="/images/hero.png"
          layout="fill"
          objectFit="cover"
          alt="Hero Background"
          className="-z-10"
        />
        <div
          className={`absolute top-0 left-0 w-full h-full z-5 inset-0", ${
            theme === "dark"
              ? "bg-gradient-to-b from-[#000000b7] via-transparent to-[#0000003b]"
              : "bg-gradient-to-b from-[#ffffffbb] via-transparent to-[#ffffff44]"
          }`}
        ></div>
      </div>
      <div className="absolute top-[17%] sm:top-[14%] left-0 right-0">
        <div className="flex-center flex-col gap-10">
          <h6
            className={`sm:font-semibold text-sm sm:text-lg lg:text-xl backdrop-blur-[5px] p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
              theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
            }`}
          >
            Good Place. Great Food.
          </h6>
          <div
            className={`flex-center flex-col backdrop-blur-[5px] p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
              theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
            }`}
          >
            <h1 className="font-extrabold text-lg sm:text-4xl lg:text-6xl">
              A Really Good Place
            </h1>
            <h1 className="font-extrabold text-lg sm:text-4xl lg:text-6xl">
              to Eat In the City of New York
            </h1>
          </div>
          <div
            className={`flex-center flex-col backdrop-blur-[5px] p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
              theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
            }`}
          >
            <h6 className="sm:font-semibold text-sm sm:text-lg lg:text-xl">
              Lorem ipsum dolor sit amet
            </h6>
            <h6 className="sm:font-semibold text-sm sm:text-lg lg:text-xl">
              {" "}
              adipisicing elit.Aliquam natus cum qui!
            </h6>
          </div>
          <div className="w-1 h-40">
            <Separator
              orientation="vertical"
              className={`${theme === "dark" ? "bg-white" : "bg-black"}`}
            />
          </div>
          <Link href="#outlets" className="motion-svg flex font-semibold z-10">
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
  );
};

export default Hero;
