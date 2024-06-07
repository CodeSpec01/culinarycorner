"use client";

import { Button } from "@/src/components/ui/button";
import clsx from "clsx";
import { Soup } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const { theme } = useTheme();
  return (
    <div className=" h-screen flex-center flex-col gap-10">
      <Image
        src={`/images/not-found.png`}
        layout="fill"
        objectFit="cover"
        alt="Hero Background"
        className="-z-10 "
      />
      <div
        className={clsx("absolute top-0 left-0 w-full h-full z-5", {
          "bg-gradient-to-b from-[#000000d2] via-transparent to-[#0000003b]":
            theme !== "light",
          "bg-gradient-to-b from-[#ffffff5e] via-transparent to-[#ffffff44]":
            theme === "light",
        })}
      ></div>
      <div>
        <h1
          className={`flex-center gap-3 sm:text-3xl md:text-4xl lg:text-6xl flex-wrap backdrop-blur-[5px] p-4 py-1 sm:p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
            theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
          }`}
        >
          <Soup size={70} className="w-[7vw] sm:w-[10vw]" />
          This Recepie is not yet cooked
        </h1>
      </div>
      <Link href={"/"} className="z-10">
        <Button className="text-xl cursor-pointer">Return Home</Button>
      </Link>
    </div>
  );
}
