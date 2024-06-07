import React from "react";

const Loading = ({width, heigth, className} : {width? : string, heigth? : string, className? : string}) => {
  return (
    <>
      <div className={`absolute ${className ? className : "top-[45vh] sm:left-[45vw] left-[40vw]"}`}>
        <svg
          className=""
          viewBox="0 0 200 200"
          width={width || "100"}
          height={heigth || "100"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
              <stop offset="0%" stop-color="hsl(313,90%,55%)" />
              <stop offset="100%" stop-color="hsl(223,90%,55%)" />
            </linearGradient>
            <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="hsl(313,90%,55%)" />
              <stop offset="100%" stop-color="hsl(223,90%,55%)" />
            </linearGradient>
          </defs>
          <circle
            className="pl__ring"
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke="url(#pl-grad1)"
            stroke-width="36"
            stroke-dasharray="0 257 1 257"
            stroke-dashoffset="0.01"
            stroke-linecap="round"
            transform="rotate(-90,100,100)"
          />
          <line
            className="pl__ball"
            stroke="url(#pl-grad2)"
            x1="100"
            y1="18"
            x2="100.01"
            y2="182"
            stroke-width="36"
            stroke-dasharray="1 165"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default Loading;
