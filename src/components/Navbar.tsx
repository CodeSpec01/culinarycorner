"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import ThemeChange from "./ThemeChange";

import {
  BadgeInfo,
  Home,
  KeyRound,
  Link2Icon,
  LogOut,
  Menu,
  MenuSquare,
  Settings,
  Star,
  UserPlus2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { usePathname } from "next/navigation";
import { links } from "@/src/utils/constants";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/user/quickData", {
        method: "GET",
      });

      if (!res.ok) {
        setIsLoggedIn(false);
        return;
      }

      console.log("here");

      const data = await res.json();
      setUserData({
        username: data.data.data.username,
        email: data.data.data.email,
        avatar: data.data.data.avatar,
      });
      console.log(data.data.data);
      setIsLoggedIn(true);
    };
    fetchData();
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <div
      className={clsx(
        "border-b-[1px] fixed w-screen z-50 backdrop-blur-[9px]",
        {
          "border-white bg-[#0000003d]": theme !== "light",
          "border-black bg-[#ffffff3d]": theme === "light",
        }
      )}
    >
      <nav className="flex justify-between flex-wrap bg-transparent p-[5vw] pb-2 sm:pb-3 sm:p-6 lg:justify-around">
        <div className="flex items-center flex-shrink-0 text-white">
          <Image
            src="/images/logo.png"
            width={120}
            height={320}
            alt="Logo"
            className={clsx("sm:w-[18vw] md:w-[15vw] lg:w-auto xl:w-auto", {
              invert: theme === "light",
            })}
          />
        </div>

        <div className="hidden sm:flex sm:items-center sm:justify-around sm:gap-5 lg:gap-6 lg:text-[22px] ">
          <div className="hidden md:flex md:justify-around md:gap-6 lg:gap-10">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.route}
                className={clsx("relative cursor-pointer", {
                  "hover-underline-dark": theme !== "light",
                  "hover-underline-light": theme === "light",
                  "underline underline-offset-4": link.route === pathName,
                })}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-lg p-2 md:hidden">
              <p
                className={clsx(
                  "md:hidden relative cursor-pointer flex-center gap-2",
                  {
                    "hover-underline-dark": theme !== "light",
                    "hover-underline-light": theme === "light",
                  }
                )}
              >
                Quick Links
                <Link2Icon />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={"/"}>
                <DropdownMenuItem className="flex items-center justify-start gap-3">
                  <Home size={20} /> Home
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={"/about"}>
                <DropdownMenuItem className="flex items-center justify-start gap-3">
                  <BadgeInfo size={20} /> About Us
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={"/menu"}>
                <DropdownMenuItem className="flex items-center justify-start gap-3">
                  <MenuSquare size={20} /> Menu
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={"/reviews"}>
                <DropdownMenuItem className="flex items-center justify-start gap-3">
                  <Star size={20} />
                  Testimonials
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-5 lg:gap-8 items-center">
            <button
              className={clsx(
                "p-2 rounded-md overflow-hidden relative cursor-pointer hover:border-transparent",
                {
                  "reservation-dark hover:text-black focus:text-black border-white border-2":
                    theme !== "light",
                  "reservation-light hover:text-white focus:text-white border-black border-2":
                    theme === "light",
                }
              )}
            >
              Reservation
            </button>

            <div
              className={clsx("border-[1px] rounded-full w-12 h-12", {
                "focus:border-white hover:border-white": theme !== "light",
                "border-transparent": userData.avatar,
                "border-white": !userData.avatar && theme !== "light",
                "focus:border-black hover:border-black": theme === "light",
                "border-black": !userData.avatar && theme === "light",
              })}
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={userData.avatar ? userData.avatar : "/icons/user.svg"}
                    width={48}
                    height={48}
                    className={clsx(
                      "object-cover cursor-pointer rounded-full",
                      {
                        invert: !userData.avatar && theme === "light",
                      }
                    )}
                    alt="User Initial Letter"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="px-4">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuLabel>
                        <div className="flex-center gap-4">
                          <Image
                            src={
                              userData.avatar
                                ? userData.avatar
                                : "/icons/user.svg"
                            }
                            width={60}
                            height={60}
                            alt="User Icon"
                            className="rounded-full"
                          />

                          <div className="flex-center gap-1 flex-col">
                            <h3 className="font-semibold text-lg">
                              {userData.username}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {userData.email}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <Link href={"/profile"}>
                        <DropdownMenuItem className="flex-center justify-start gap-3 cursor-pointer p-2">
                          <Settings />
                          <p className="text-lg">Manage Account</p>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator className="" />
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="flex justify-center my-3">
                    <ThemeChange />
                  </div>
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuSeparator className="" />
                      <DropdownMenuItem
                        className="flex-center gap-3 cursor-pointer p-2 text-lg"
                        onClick={async () => {
                          const response = await fetch("/api/user/logout", {
                            method: "GET",
                          });
                          if (!response.ok) {
                            toast({ title: "Something went wrong" });
                          }

                          toast({ title: "Logout Successfully" });
                        }}
                      >
                        <LogOut />
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuSeparator />
                      <Link href={"/signup"}>
                        <DropdownMenuItem className="flex-center gap-3 cursor-pointer p-2 text-lg">
                          <UserPlus2 />
                          Sign Up
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link href={"/login"}>
                        <DropdownMenuItem className="flex-center gap-3 cursor-pointer p-2 text-lg">
                          <KeyRound />
                          Login
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="sm:hidden flex-center gap-5">
          <Sheet>
            <SheetTrigger>
              <Menu size={50} />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex items-center flex-col justify-start"
            >
              <SheetHeader className="flex-center">
                <Image
                  src={"/images/icon.png"}
                  height={100}
                  width={100}
                  alt="Logo"
                  className={clsx("", {
                    invert: theme === "light",
                  })}
                />
                <SheetTitle>Culinary Corner</SheetTitle>
                <SheetDescription className="relative -inset-y-3">
                  Taste of Perfection
                </SheetDescription>
              </SheetHeader>
              <Accordion type="single" collapsible className="w-full" >
                <AccordionItem value="profile">
                  <AccordionTrigger className="flex justify-around w-full">
                    <div
                      className={`flex-center gap-4 w-full flex-wrap ${
                        !isLoggedIn ? "mr-5" : ""
                      }`}
                    >
                      <Image
                        src={
                          userData.avatar ? userData.avatar : "/icons/user.svg"
                        }
                        width={40}
                        height={40}
                        alt="User Icon"
                        className="rounded-full"
                      />
                      {isLoggedIn ? (
                        <>
                          <div className="flex-center gap-1 flex-col">
                            <h3 className="text-sm font-semibold">
                              {userData.username}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {userData.email}
                            </p>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    {isLoggedIn ? (
                      <>
                        <Link href={"/profile"}>
                          <div className="flex items-center justify-start gap-3 cursor-pointer py-2">
                            <Settings />
                            <p>Manage Account</p>
                          </div>
                        </Link>
                        <DropdownMenuSeparator />
                        <div
                          className="flex items-center justify-start gap-3 cursor-pointer pt-2"
                          onClick={async () => {
                            const response = await fetch("/api/user/logout", {
                              method: "GET",
                            });
                            if (!response.ok) {
                              toast({ title: "Something went wrong" });
                            }

                            setUserData({
                              username: "",
                              email: "",
                              avatar: "",
                            });

                            toast({ title: "Logout Successfully" });
                          }}
                        >
                          <LogOut />
                          Sign Out
                        </div>
                      </>
                    ) : (
                      <>
                        <>
                          <Link href={"/signup"}>
                            <div className="flex-center gap-3 cursor-pointer p-2 text-lg">
                              <UserPlus2 />
                              Sign Up
                            </div>
                          </Link>
                          <DropdownMenuSeparator className="" />
                          <Link href={"/login"}>
                            <div className="flex-center gap-3 cursor-pointer p-2 text-lg">
                              <KeyRound />
                              Login
                            </div>
                          </Link>
                        </>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
                <div className="flex-center flex-col gap-3 pt-3">
                  <div>
                    <ThemeChange />
                    <DropdownMenuSeparator className="mt-2" />
                  </div>
                  <Link
                    href="/"
                    className={clsx("relative cursor-pointer", {
                      "hover-underline-dark": theme !== "light",
                      "hover-underline-light": theme === "light",
                    })}
                  >
                    Home
                    <DropdownMenuSeparator />
                  </Link>
                  <Link
                    href="/about"
                    className={clsx("relative cursor-pointer", {
                      "hover-underline-dark": theme !== "light",
                      "hover-underline-light": theme === "light",
                    })}
                  >
                    About US
                    <DropdownMenuSeparator />
                  </Link>
                  <Link
                    href="/menu"
                    className={clsx("relative cursor-pointer", {
                      "hover-underline-dark": theme !== "light",
                      "hover-underline-light": theme === "light",
                    })}
                  >
                    Menu
                    <DropdownMenuSeparator />
                  </Link>
                  <Link
                    href="/reviews"
                    className={clsx("relative cursor-pointer", {
                      "hover-underline-dark": theme !== "light",
                      "hover-underline-light": theme === "light",
                    })}
                  >
                    Testimonial
                    <DropdownMenuSeparator />
                  </Link>
                </div>
              </Accordion>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
