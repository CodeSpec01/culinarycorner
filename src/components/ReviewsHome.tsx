import React from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { reviews } from "../utils/constants";
import ReviewCard from "./ReviewCard";
import Link from "next/link";
import { CircleArrowDown } from "lucide-react";

const ReviewsHome = ({ theme }: { theme: string }) => {
  return (
    <div
      id="reviews"
      className={` flex flex-col items-center pt-[22vw] sm:pt-[15vw] md:pt-[12vw] lg:pt-[8vw] gap-16 ${
        theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#f8f1e3]"
      }`}
    >
      <div className="flex-col flex-center gap-10 px-10">
        <div className="flex-center gap-8 w-full">
          <Separator
            className={`inline w-0 sm:w-[20vw] ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
          <h2 className="text-5xl sm:text-6xl font-serif font-semibold text-center leading-[55px]">
            Voice of Our Guests
          </h2>
          <Separator
            className={`inline w-0 sm:w-[20vw] ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
        </div>

        <p className="text-slate-400">
          Discover the stories behind our flavors.
        </p>
        <p className="md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
          Our guest&apos;s experiences are at the heart of what we do. From the
          first bite to the final course, their words reflect the passion and
          dedication we pour into every dish. Read their testimonials and see
          why our culinary creations leave a lasting impression.
        </p>
      </div>

      <div className="w-full relative">
        <Image
          src={"/images/review.png"}
          fill
          sizes="auto"
          style={{ objectFit: "cover" }}
          alt="review bg"
          className={`${theme === "dark" ? "brightness-50" : "brightness-100"}`}
        />

        <div className=" flex-center w-full gap-[10%] flex-wrap p-10 px-5">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              theme={theme!}
              name={review.name}
              review={review.review}
              image={review.image}
            />
          ))}
        </div>

        <div className="relative w-full flex-center gap-[5%] md:gap-[10%] pb-[6%] sm:pb-[2%]">
          <Separator
            orientation="vertical"
            className={`h-[20vh] w-[2px] sm:w-[1px] ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
          <Link
            href="#reservation"
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
  );
};

export default ReviewsHome;
