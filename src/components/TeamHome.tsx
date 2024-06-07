import React from 'react'
import { Separator } from './ui/separator';
import { chefLeft, chefRight } from '../utils/constants';
import ChefCard from './ChefCard';
import Link from 'next/link';
import { CircleArrowDown } from 'lucide-react';

const TeamHome = ({theme} : {theme : string}) => {
  return (
    <div
      id="team"
      className={`flex flex-col items-center p-10 pt-[22vw] sm:pt-[15vw] md:pt-[12vw] lg:pt-[8vw] gap-16 ${
        theme === "dark" ? "bg-[#4a4a4a]" : "bg-[#b5b5b5]"
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
            Meet the Masters Knifes
          </h2>
          <Separator
            className={`inline w-0 sm:w-[20vw] ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
        </div>

        <p className="text-slate-400">Experience culinary artistry.</p>
        <div className="flex flex-col sm:flex-row w-full gap-5 justify-start items-center px-3">
          <div className="sm:w-[50%] flex-col flex items-center sm:items-end justify-start gap-5">
            <p className=" lg:w-[40vw] xl:w-[40vw] text-start px-3">
              Welcome to Culinary Corner, where decades of culinary experience
              and a commitment to excellence come together to create an
              unforgettable dining experience. Taking pride in using the finest
              ingredients to craft dishes that exemplify the highest standards
              of quality and taste. Our dedication to exceptional food and
              service ensures that every meal not only delights your palate but
              also leaves a lasting impression. What truly sets us apart is our
              team of exceptional chefs, each bringing unique expertise and
              creativity to every dish.
            </p>
            {chefLeft.map((chef, index) => (
              <ChefCard
                key={index}
                src={chef.image}
                text={chef.text}
                theme={theme!}
                name={chef.name}
              />
            ))}
          </div>

          <div className="sm:w-[50%] relative flex-col flex gap-10 items-start">
            {chefRight.map((chef, index) => (
              <ChefCard
                key={index}
                src={chef.image}
                text={chef.text}
                theme={theme!}
                name={chef.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full flex-center gap-[5%] md:gap-[10%]">
        <Separator
          orientation="vertical"
          className={`h-[20vh] w-[2px] sm:w-[1px] ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
        />
        <Link
          href="#reviews"
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
  );
}

export default TeamHome