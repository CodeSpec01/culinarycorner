"use client";

import { links, socials } from "@/src/utils/constants";
import { CalendarClock, Link2Icon, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <>
      <div className="p-10">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="flex items-start justify-center flex-col w-full sm:w-[40%] md:w-[20%] gap-4">
            <div className="flex-center gap-2">
              <Image
                src={"/images/icon.png"}
                height={40}
                width={40}
                alt="Icon"
                className={`rounded-full ${
                  theme === "light" ? "invert" : "invert-0"
                }`}
              />
              <p className="text-2xl font-semibold">Culinary Corner</p>
            </div>
            <p className="text-sm">
              nobis laudantium sapiente nihil, doloribus consequuntur fugit iste
              atque ipsa earum at repellat porro quas impedit! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Nesciunt
            </p>
            <div
              className={`flex-center gap-4 ${
                theme === "dark" ? "invert" : "invert-0"
              }`}
            >
              {socials.map((social, index) => (
                <Link href={social.url} target="_blank">
                  <Image
                    src={social.image}
                    width={20}
                    height={20}
                    alt={social.name}
                    key={index}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-start justify-start flex-col w-full sm:w-[40%] md:w-[20%] gap-4">
            <div className="flex-center gap-1">
              <p className="text-2xl flex-center gap-2 font-semibold">
                <MapPin />
                Our Location
              </p>
            </div>
            <p>
              3 E 19th St, 123 Fifth Avenue, NY 10160, New York, USA 1 234 567
              890
            </p>
          </div>

          <div className="flex items-start justify-start flex-col w-full sm:w-[40%] md:w-[20%] gap-4">
            <div className="flex-center gap-1">
              <p className="text-2xl font-semibold flex-center gap-2">
                <Link2Icon />
                Quick Links
              </p>
            </div>
            <div className="flex items-start flex-col gap-2">
              {links.map((link, index) => (
                <Link href={link.route} key={index}>
                  <p>{link.name}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-start justify-start flex-col w-full sm:w-[40%] md:w-[20%] gap-4">
            <div className="flex-center gap-1">
              <p className="text-2xl flex-center gap-2 font-semibold">
                <CalendarClock />
                Opening Hours
              </p>
            </div>
            <div>
              <p className="text-xl">Monday to Friday</p>
              <p className="text-slate-400 text-sm">9 AM - 9:30 PM</p>
            </div>
            <div>
              <p className="text-xl">Saturday to Sunday</p>
              <p className="text-slate-400 text-sm">9 AM - 11:30 PM</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`border-t-[1px] p-10 ${
          theme === "dark" ? "border-white" : "border-black"
        }`}
      >
        <div className="flex flex-wrap gap-10 justify-between items-center">
          <p>Copyright © 2024 Deli Restaurant</p>
          <p>Powered by Culinary Corner Restaurants</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
