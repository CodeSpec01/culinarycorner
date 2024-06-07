"use client";

import React, { useState } from "react";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff, Undo2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import Loading from "@/src/components/Loading";
import PasswordField from "@/src/components/PasswordField";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function SignupPage() {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const fullNameRegex = /^[a-zA-Z\s]+$/;

  const router = useRouter();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isEnteringOtp, setIsEnteringOtp] = useState(false);
  const [OTP, setOTP] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });

  const signUpfunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    if (!user.username) {
      setLoading(false);
      setErrorMsg("Username is required !");
      return;
    }
    if (!usernameRegex.test(user.username)) {
      setLoading(false);
      setErrorMsg("Username can only consist of alphabets and numbers");
      return;
    }
    if (!user.email) {
      setLoading(false);
      setErrorMsg("Email is required !");
      return;
    }
    if (!emailRegex.test(user.email)) {
      setLoading(false);
      setErrorMsg("Email is invalid");
      return;
    }
    if (!user.fullName) {
      setLoading(false);
      setErrorMsg("Full Name is required!");
      return;
    }
    if (!fullNameRegex.test(user.fullName)) {
      setLoading(false);
      setErrorMsg("Full Name can only consist of alphabets");
      return;
    }
    if (!user.password) {
      setLoading(false);
      setErrorMsg("Password is required!");
      return;
    }
    if (!passwordRegex.test(user.password)) {
      setLoading(false);
      setErrorMsg(
        "password should be atleast 8 characters long and consist of capital and small alphabet, number and special characters"
      );
      return;
    }

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const resJson = await res.json();
    if (!res.ok) {
      setLoading(false);
      setErrorMsg(resJson.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(resJson.message + "-");
    setIsEnteringOtp(true);
  };

  const verifyOtpFunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    if (!OTP || OTP.length !== 6) {
      setLoading(false);
      setErrorMsg("OTP is required!");
      return;
    }

    const res = await fetch("/api/user/signup", {
      method: "GET",
      headers: {
        "code": OTP
      }
    })

    const resJson = await res.json();
    if (!res.ok) {
      setLoading(false);
      setErrorMsg(resJson.message);
      return;
    }

    setButtonDisabled(true);
    setLoading(false);
    setSuccessMsg(resJson.message + "-redirecting to home page....");
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <>
      <div className="relative flex-center py-[30%] sm:py-[20%] md:py-[10%] px-2">
        <Image
          src="/images/signup.png"
          layout="fill"
          objectFit="cover"
          alt="bg"
          className="-z-10"
        />
        <div
          className={` absolute w-full h-full ${
            theme === "dark"
              ? "bg-gradient-to-b from-[#000000b7] via-transparent to-[#0000003b]"
              : ""
          }`}
        ></div>
        <Card className="w-[350px] z-20">
          <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Join the delicious.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                {isEnteringOtp ? (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <InputOTP
                        maxLength={6}
                        value={OTP}
                        onChange={(e) => {
                          setOTP(e);
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="CoolChef01"
                        onChange={(e) => {
                          setUser((prev) => ({
                            ...user,
                            username: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">email</Label>
                      <Input
                        id="email"
                        placeholder="chef@example.com"
                        required={true}
                        type="email"
                        onChange={(e) => {
                          setUser(() => ({
                            ...user,
                            email: e.target.value.toLowerCase(),
                          }));
                        }}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Chef Gordon Ramsay"
                        required={true}
                        onChange={(e) => {
                          setUser(() => ({
                            ...user,
                            fullName: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <PasswordField
                      onChange={(e) => {
                        setUser(() => ({
                          ...user,
                          password: e.target.value,
                        }));
                      }}
                    />
                  </>
                )}
              </div>
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
          </CardContent>
          <CardFooter className="flex-center gap-5 flex-col">
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
                {isEnteringOtp ? (
                  <>
                    <Button
                      onClick={verifyOtpFunc}
                      className="w-full"
                      disabled={buttonDisabled}
                    >
                      Verify OTP
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEnteringOtp(false);
                        setErrorMsg("");
                        setSuccessMsg("");
                      }}
                      className="w-full"
                      disabled={buttonDisabled}
                    >
                      Go back <Undo2Icon size={18} className="ml-2" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={signUpfunc} className="w-full">
                      Sign Up
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        router.push("/login");
                      }}
                      className="w-full"
                    >
                      Login Instead
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
}
