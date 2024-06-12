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
import { usePathname, useSearchParams } from "next/navigation";
import { links } from "@/src/utils/constants";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const searchParams = useSearchParams().toString()
  const router = useRouter();
  const { toast } = useToast();
  const { theme } = useTheme();
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "loading...",
    avatar: "",
  });

  const fetchData = async () => {
    const res = await fetch("/api/user/quickData", {
      method: "GET",
    });

    if (!res.ok) {
      setIsLoggedIn(false);
      setButtonDisabled(false);
      return;
    }

    const data = await res.json();
    setUserData({
      username: data.data.data.username,
      email: data.data.data.email,
      avatar: data.data.data.avatar,
    });
    setIsLoggedIn(true);
    setButtonDisabled(false);
  };

  useEffect(() => {
    fetchData();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchParams) {
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchData();
    }
  }, [searchParams]);

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
            priority
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
            <Link href={'/reservation'}>
              <button
                className={clsx(
                  "p-2 rounded-md overflow-hidden relative cursor-pointer hover:border-transparent",
                  {
                    "reservation-dark hover:text-black border-white border-2":
                      theme !== "light",
                    "reservation-light hover:text-white border-black border-2":
                      theme === "light",
                  }
                )}
              >
                Reservation
              </button>
            </Link>

            <div
              className={clsx("border-[1px] rounded-full w-12 h-12", {
                "hover:border-white": theme !== "light",
                "border-transparent": userData.avatar,
                "border-white": !userData.avatar && theme !== "light",
                "hover:border-black": theme === "light",
                "border-black": !userData.avatar && theme === "light",
              })}
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-12 h-12 rounded-full relative">
                    <Image
                      src={
                        userData.avatar ? userData.avatar : "/icons/user.svg"
                      }
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      className={clsx(
                        "object-cover cursor-pointer rounded-full absolute",
                        {
                          invert: !userData.avatar && theme === "light",
                        }
                      )}
                      alt="User Initial Letter"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="px-4">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuLabel>
                        <div className="flex-center gap-4">
                          <div className="w-14 h-14 rounded-full relative">
                            <Image
                              src={
                                userData.avatar
                                  ? userData.avatar
                                  : "/icons/user.svg"
                              }
                              fill
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt="User Icon"
                              className="rounded-full absolute"
                            />
                          </div>

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

                      <Link
                        href={"/profile"}
                        className={`${
                          buttonDisabled
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        }`}
                      >
                        <DropdownMenuItem className="flex-center gap-3 cursor-pointer p-2">
                          <Settings />
                          <p className="text-lg">Manage Account</p>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="flex justify-center my-3">
                    <ThemeChange />
                  </div>
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={`flex-center gap-3 cursor-pointer p-2 text-lg ${
                          buttonDisabled
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        }`}
                        onClick={async () => {
                          toast({
                            title: "Logging out.....",
                          });
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

                          setIsLoggedIn(false);
                          router.push("/");
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
                      <Link
                        href={"/signup"}
                        className={`${
                          buttonDisabled
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        }`}
                      >
                        <DropdownMenuItem className="flex-center gap-3 cursor-pointer p-2 text-lg">
                          <UserPlus2 />
                          Sign Up
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link
                        href={"/login"}
                        className={`${
                          buttonDisabled
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        }`}
                      >
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
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="profile">
                  <AccordionTrigger className="flex justify-around w-full">
                    <div
                      className={`flex-center gap-4 w-full flex-wrap ${
                        !isLoggedIn ? "mr-5" : ""
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full relative">
                        <Image
                          src={
                            userData.avatar
                              ? userData.avatar
                              : "/icons/user.svg"
                          }
                          fill
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          alt="User Icon"
                          className={clsx(
                            "object-cover cursor-pointer rounded-full absolute",
                            {
                              invert: !userData.avatar && theme === "light",
                            }
                          )}
                        />
                      </div>
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
                        <Link
                          href={"/profile"}
                          className={`${
                            buttonDisabled
                              ? "pointer-events-none"
                              : "pointer-events-auto"
                          }`}
                        >
                          <div className="flex items-center justify-start gap-3 cursor-pointer py-2">
                            <Settings />
                            <p>Manage Account</p>
                          </div>
                        </Link>
                        <DropdownMenuSeparator />
                        <div
                          className={`flex items-center justify-start gap-3 cursor-pointer pt-2 ${
                            buttonDisabled
                              ? "pointer-events-none"
                              : "pointer-events-auto"
                          }`}
                          onClick={async () => {
                            toast({
                              title: "Logging out.....",
                            });
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

                            setIsLoggedIn(false);
                            router.push("/");
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
                          <Link
                            href={"/signup"}
                            className={`${
                              buttonDisabled
                                ? "pointer-events-none"
                                : "pointer-events-auto"
                            }`}
                          >
                            <div className="flex-center gap-3 cursor-pointer p-2 text-lg">
                              <UserPlus2 />
                              Sign Up
                            </div>
                          </Link>
                          <DropdownMenuSeparator className="" />
                          <Link
                            href={"/login"}
                            className={`${
                              buttonDisabled
                                ? "pointer-events-none"
                                : "pointer-events-auto"
                            }`}
                          >
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
