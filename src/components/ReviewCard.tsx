import Image from "next/image";
import React from "react";

interface ReviewCardType {
  name: string;
  review: string;
  image: string;
  theme: string;
}

const ReviewCard = ({ name, review, image, theme }: ReviewCardType) => {
  return (
    <div className="z-10 flex-center flex-col relative sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%] ">
      <div className="h-[100px] w-[100px] relative ">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="User Image"
          className="rounded-full relative z-10 border-4 border-[#6ba4e3cc]"
        />
      </div>

      <div
        className={`relative flex-center flex-col gap-5 pt-16 pb-10 px-6 backdrop-blur-sm shadow-md rounded-xl -inset-y-6 shadow-[#000000bf] ${
          theme === "dark" ? "bg-[#00000048]" : "bg-[#ffffff57]"
        }`}
      >
        <p className="">{review}</p>
        <p className="text-2xl font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
