"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/src/components/ui/switch";

import clsx from "clsx";

const ThemeChange = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div className={"flex-center gap-5"}>
        <Sun />{" "}
        <Switch
          className={clsx("border-2", {
            "border-white": theme === "dark",
            "border-black bg-black": theme === "light",
          })}
          onCheckedChange={(prev) => {
            if (prev) {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
          // checked
          defaultChecked={theme === "dark"}
        />{" "}
        <Moon />
      </div>
    </>
  );
};

export default ThemeChange;
