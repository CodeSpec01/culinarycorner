import React from "react";
import Link from "next/link";
import Image from "next/image";

import { outlets } from "../utils/constants";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { CircleArrowDown, MapPin, MapPinned } from "lucide-react";
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

const Outlets = ({ theme }: { theme: string }) => {
  return (
    <div
      id="outlets"
      className={`flex flex-col items-center p-10 pt-[22vw] sm:pt-[15vw] md:pt-[12vw] lg:pt-[8vw] ${
        theme === "dark" ? "bg-[#6461619c]" : "bg-[#e0d7d2]"
      }`}
    >
      <div className="flex-col flex-center gap-10">
        <h2 className="text-6xl font-serif font-semibold">
          Discover our Venues
        </h2>
        <p className="text-slate-400">Find your perfect dining spot.</p>
        <p className="md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
          Explore our locations and experience the unique ambiance of each of
          our dining spots. Whether you&apos;re looking for a cozy corner to
          enjoy a quiet meal or a lively atmosphere to celebrate with friends
          and family, our various branches offer something special for everyone.
          Visit us and discover the delicious flavors and exceptional service
          that make our restaurants a favorite destination. Find a location near
          you and join us for an unforgettable dining experience.
        </p>
      </div>

      <div className="flex-center flex-wrap w-full pt-10 gap-8">
        {outlets.map((outlet, index) => (
          <div
            key={index}
            className={`overflow-hidden w-[45vh] h-[80vh] relative ${
              theme === "dark" ? "image-overlay-dark" : "image-overlay-light"
            }`}
          >
            <Image
              src={outlet.image!}
              fill
              sizes="auto"
              style={{ objectFit: "cover" }}
              alt="outlet"
            />
            <div className="relative w-full h-full text-center p-4 flex-center flex-col z-10">
              <p
                className={`text-4xl backdrop-blur-[5px] p-3 rounded-xl shadow-black shadow-md ${
                  theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
                }`}
              >
                {outlet.address}
              </p>
              <Drawer>
                <DrawerTrigger className="w-full" asChild>
                  <div className="absolute w-[50%] h-full flex items-end justify-center -bottom-[10%] hover:bottom-[10%] transition-all duration-500" >
                    <Button tabIndex={-1}>
                      Get Directions <MapPin />
                    </Button>
                  </div>
                </DrawerTrigger>
                <DrawerContent className="w-full h-[90vh] sm:h-auto flex-center ">
                  <DrawerHeader>
                    <DrawerTitle className="flex-center gap-3">
                      <Link href={outlet.link} target="_blank">
                        <Button variant="outline">
                          Directions <MapPinned />
                        </Button>
                      </Link>
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-full ">
                    <iframe
                      src={outlet.maps}
                      className="w-full "
                      height="450"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ border: 0 }}
                    ></iframe>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="destructive">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1 h-40 pt-7">
        <Separator
          orientation="vertical"
          className={`h-full ${theme === "dark" ? "bg-white" : "bg-black"}`}
        />
      </div>
      <Link
        href="#menu"
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
  );
};

export default Outlets;
