"use client";

import { Separator } from "@/src/components/ui/separator";
import { CircleArrowDown, EditIcon, SaveAllIcon, Undo2 } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PasswordField from "@/src/components/PasswordField";
import Loading from "@/src/components/Loading";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState({
    username: "loading.....",
    fullName: "loading.....",
    email: "loading.....",
    avatar: "",
    order: [],
    reservation: [],
  });
  const [editedUser, setEditedUser] = useState(user);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [newWindow, setNewWindow] = useState<Window & typeof globalThis>();

  useEffect(() => {

    setNewWindow(window)
    
    if (window.location.search.includes("?")) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
      window.location.reload();
    }
    const fetchData = async () => {

      const res = await fetch("/api/user/profile");
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message);
        return;
      }

      setUser({
        username: data.data.username,
        fullName: data.data.fullName,
        email: data.data.email,
        avatar: data.data.avatar,
        order: data.data.order,
        reservation: data.data.reservation,
      });
      setEditedUser({
        username: data.data.username,
        fullName: data.data.fullName,
        email: data.data.email,
        avatar: data.data.avatar,
        order: data.data.order,
        reservation: data.data.reservation,
      });
    };

    fetchData();
    setMounted(true);
  }, []);

  useEffect(() => { 
    if (window.location.search.includes("?")) {
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  },[newWindow?.location.search])

  const saveData = async (activeTabProp?: string, avatar?: File) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const activeTabFunc = activeTabProp ? activeTabProp : activeTab;

    let outgoingData;
    if (activeTabFunc === "account") {
      if (user == editedUser) {
        setLoading(false);
        setErrorMsg("Make atleast one change in account settings");
        return;
      }
      outgoingData = {
        username: editedUser.username,
        fullName: editedUser.fullName,
        email: editedUser.email,
        activeTab: activeTabFunc,
      };
    }

    if (activeTabFunc === "password") {
      if (!(password === confirmPassword)) {
        setLoading(false);
        setErrorMsg("Passwords do not match");
        return;
      }
      outgoingData = {
        password: confirmPassword,
        email: user.email,
        activeTab: activeTabFunc,
      };
    }

    if (activeTabFunc !== "avatar") {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        body: JSON.stringify(outgoingData),
        headers: {
          activeTab: activeTabFunc,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setErrorMsg(data.message);
      }

      setSuccessMsg(data.message + "-Refreshing information...");
      router.push(`/profile?q=${activeTabFunc}`);
      setLoading(false);
      setUser(editedUser);
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    }

    if (activeTabFunc === "avatar") {
      if (!avatar) {
        setLoading(false);
        setErrorMsg("Please select a file");
        return;
      }
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("email", user.email);
      const res = await fetch("/api/user/profile", {
        method: "POST",
        body: formData,
        headers: {
          activeTab: "avatar",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrorMsg(data.message);
      }

      setUser((prev) => ({
        ...prev,
        avatar: data.avatar,
      }));
      setEditedUser((prev) => ({
        ...prev,
        avatar: data.avatar,
      }));
      setSuccessMsg(data.message + "-Refreshing information...");
      router.push(`/profile?q=${activeTabFunc}`);
      setLoading(false);
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    }
  };

  if (!mounted) {
    return;
  }

  return (
    <>
      <div className="relative min-h-screen">
        <div className="h-full -z-10 absolute inset-0">
          <Image
            src="/images/profile.png"
            layout="fill"
            objectFit="cover"
            alt="Hero Background"
            className="-z-10"
          />
          <div
            className={`absolute top-0 left-0 w-full h-full z-5 inset-0", ${
              theme === "dark"
                ? "bg-gradient-to-b from-[#000000b7] via-transparent to-[#0000003b]"
                : ""
            }`}
          ></div>
        </div>
        <div className="absolute h-full left-0 right-0">
          <div className="flex-center flex-col gap-10 relative h-full">
            <div
              className={`flex-center flex-col backdrop-blur-[5px] p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
                theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
              }`}
            >
              <h1 className="font-extrabold text-4xl lg:text-6xl">
                User Profile
              </h1>
            </div>
            <div
              className={`flex-center flex-col backdrop-blur-[5px] p-4 rounded-[25px] shadow-[#000000bf] shadow-md ${
                theme === "dark" ? "bg-[#0000003c]" : "bg-[#ffffff3a]"
              }`}
            >
              <h6 className="sm:font-semibold text-sm sm:text-lg lg:text-xl">
                Customise your Toolkit
              </h6>
            </div>
            <div className="w-1 h-40">
              <Separator
                orientation="vertical"
                className={`${theme === "dark" ? "bg-white" : "bg-black"}`}
              />
            </div>
            <Link
              href="#profile"
              className="motion-svg flex font-semibold z-10"
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

      <div
        id="profile"
        className="min-h-screen relative flex-center flex-col py-[10vh] gap-[5vh]"
      >
        <div>
          <h1 className="text-center text-6xl pt-5">User Details</h1>
        </div>
        <div className="w-[60vw] max-w-[250px] h-[60vw] max-h-[250px] relative">
          <Image
            src={user.avatar || "/icons/user.svg"}
            layout="fill"
            objectFit="cover"
            alt="pfp"
            className="rounded-full absolute w-[10vw] h-[10vw]"
          />
          <label className="absolute bg-transaprent w-full h-full rounded-full">
            <input
              type="file"
              className="hidden"
              accept=".png, .jpg, jpeg"
              onChange={(e) => {
                e.preventDefault();
                setActiveTab("avatar");
                if (!e.target.files) {
                  setErrorMsg("Please select an image to upload");
                  return;
                }
                saveData("avatar", e.target.files![0]);
              }}
            />
          </label>
        </div>

        <Card className=" max-w-[100%] md:w-[50%] lg:w-[40%] xl:w-[30%] py-[5vh] z-20">
          <CardHeader>
            <CardTitle className="text-center">User Details</CardTitle>
            <CardDescription className="text-center">
              Your Culinary Profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full mb-[5%]">
                <TabsTrigger
                  value="account"
                  className="w-[50%]"
                  onClick={() => setActiveTab("account")}
                >
                  Account Settings
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-[50%]"
                  onClick={() => setActiveTab("password")}
                >
                  Password Settings
                </TabsTrigger>
              </TabsList>
              <form>
                <TabsContent value="account">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">User Name</Label>
                      <Input
                        id="username"
                        value={editing ? editedUser.username : user.username}
                        className={`disabled:opacity-100 disabled:cursor-default ${
                          theme === "dark" ? "" : "disabled:text-black"
                        }`}
                        disabled={!editing}
                        onChange={(e) => {
                          setEditedUser({
                            ...editedUser,
                            username: e.target.value,
                          });
                          setActiveTab("account");
                        }}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={editing ? editedUser.email : user.email}
                        type="email"
                        className={`disabled:opacity-100 disabled:cursor-default ${
                          theme === "dark" ? "" : "disabled:text-black"
                        }`}
                        disabled={!editing}
                        onChange={(e) => {
                          setEditedUser({
                            ...editedUser,
                            email: e.target.value,
                          });
                          setActiveTab("account");
                        }}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={editing ? editedUser.fullName : user.fullName}
                        className={`disabled:opacity-100 disabled:cursor-default ${
                          theme === "dark" ? "" : "disabled:text-black"
                        }`}
                        disabled={!editing}
                        onChange={(e) => {
                          setEditedUser({
                            ...editedUser,
                            fullName: e.target.value,
                          });
                          setActiveTab("account");
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="security">
                  <div className="grid w-full items-center gap-4">
                    <PasswordField
                      disabled={!editing}
                      labelText="New Password"
                      className={`${
                        theme === "dark" ? "" : "disabled:text-black"
                      }`}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setActiveTab("password");
                      }}
                    />
                    <PasswordField
                      disabled={!editing}
                      className={`${
                        theme === "dark" ? "" : "disabled:text-black"
                      }`}
                      labelText="Confirm Password"
                      labelFor="confirmPassword"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setActiveTab("password");
                      }}
                    />
                  </div>
                </TabsContent>
                <p
                  className={`text-xs ${
                    errorMsg ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {errorMsg
                    ? errorMsg
                    : `${successMsg!.slice(0, successMsg?.indexOf("-"))}`}
                  <br />
                  {successMsg?.slice(successMsg?.indexOf("-") + 1)}
                </p>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex items-center justify-around">
            {loading ? (
              <div className="h-[10vh] w-full relative flex-center">
                <Loading
                  width="50"
                  heigth="50"
                  className="top-[0] left-[0] w-full flex-center"
                />
              </div>
            ) : (
              <>
                {editing ? (
                  <>
                    <Button
                      variant="outline"
                      className="flex-center gap-2 py-5"
                      onClick={() => {
                        setEditing(false);
                      }}
                    >
                      Cancle
                      <Undo2 />
                    </Button>
                    <Button
                      className="flex-center gap-2"
                      onClick={() => {
                        setEditing(false);
                        saveData();
                      }}
                    >
                      Save
                      <SaveAllIcon />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="flex-center gap-2"
                      onClick={() => {
                        setEditing(true);
                      }}
                    >
                      Edit
                      <EditIcon />
                    </Button>
                  </>
                )}
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
