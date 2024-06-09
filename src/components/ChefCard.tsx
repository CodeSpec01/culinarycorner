import Image from "next/image";
import React from "react";

interface ChefCardType {
  theme: string;
  src: string;
  text: string;
  name: string;
}

const ChefCard = ({
  theme,
  src,
  text,
  name,
}: ChefCardType) => {
  return (
    <div
      className={`h-[80vh] w-[45vh] relative overflow-hidden  ${
        theme === "dark" ? "image-overlay-dark" : "image-overlay-light"
      }`}
    >
      <Image
        src={src}
        fill
        sizes="auto"
        style={{ objectFit: "cover" }}
        alt="chef"
        className="absolute"
      />
      <div className="relative z-10 opacity-0 hover:opacity-100 transition-all h-full flex-center">
        <p
          className={`relative backdrop-blur-[5px] mx-6 p-3 rounded-xl shadow-black shadow-md text-wrap text-sm ${
            theme === "dark" ? "bg-[#00000068]" : "bg-[#ffffff3a]"
          }`}
        >
          {text}
          <span className="text-right text-2xl block">-{name}</span>
        </p>
      </div>
    </div>
  );
};

export default ChefCard;
