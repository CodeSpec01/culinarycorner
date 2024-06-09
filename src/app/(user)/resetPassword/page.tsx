"use client";

import React, { useState } from "react";
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
import { Button } from "@/src/components/ui/button";
import Loading from "@/src/components/Loading";
import { Undo2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PasswordField from "@/src/components/PasswordField";

const ResetPasswordPage = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnteringOTP, setIsEnteringOTP] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [otp, setOtp] = useState("");

  const getOTPFunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setLoading(false);
      setErrorMsg("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setLoading(false);
      setErrorMsg("Invalid Email");
      return;
    }

    const res = await fetch(`/api/user/resetPassword`, {
      method: "GET",
      headers: {
        email: email,
      },
    });

    const resJson = await res.json();

    if (!res.ok) {
      setLoading(false);
      setErrorMsg(resJson.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(resJson.message + "-");
    setIsEnteringOTP(true);
  };

  const verifyOTPFunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp) {
      setLoading(false);
      setErrorMsg("OTP is required");
      return;
    }

    const res = await fetch(`/api/user/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: otp,
      }),
    });

    const resJson = await res.json();

    if (!res.ok) {
      setLoading(false);
      setErrorMsg(resJson.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(resJson.message + "-");
    setIsEnteringOTP(false);
    setIsChangingPassword(true);
  };

  const changePasswordFunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!password || !confirmPassword) {
      setLoading(false);
      setErrorMsg("Password is required");
      return;
    } else if (
      !passwordRegex.test(password) ||
      !passwordRegex.test(confirmPassword)
    ) {
      setLoading(false);
      setErrorMsg(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    } else if (password !== confirmPassword) {
      setLoading(false);
      setErrorMsg("Passwords do not match");
      return;
    }

    const res = await fetch(`/api/user/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });

    const resJson = await res.json();

    if (!res.ok) {
      setLoading(false);
      setErrorMsg(resJson.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(resJson.message + "-redirecting to Home Page");
    setButtonDisabled(true);
    setTimeout(() => {
      router.push("/?q=resetPassword");
    }, 2000);
  };

  return (
    <div className="relative flex-center py-[30%] sm:py-[20%] md:py-[10%] px-2">
      <Image
        src="/images/signup.png"
        fill
        sizes="auto"
        style={{ objectFit: "cover" }}
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
          <CardTitle className="text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Reclaim your secret recipe
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <form>
            <div className="grid w-full items-center gap-4">
              {isChangingPassword ? (
                <>
                  <PasswordField
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <PasswordField
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    labelFor="confirmPassword"
                    labelText="Confirm Password"
                  />
                </>
              ) : (
                <>
                  {isEnteringOTP ? (
                    <>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={(e) => {
                            setOtp(e);
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
                        <Label htmlFor="email">email</Label>
                        <Input
                          id="email"
                          placeholder="chef@example.com"
                          required={true}
                          type="email"
                          onChange={(e) => {
                            setEmail(e.target.value.toLowerCase());
                          }}
                        />
                      </div>
                    </>
                  )}
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
              {isChangingPassword ? (
                <>
                  <Button
                    onClick={changePasswordFunc}
                    className="w-full"
                    disabled={buttonDisabled}
                  >
                    Change Password
                  </Button>
                </>
              ) : (
                <>
                  {isEnteringOTP ? (
                    <>
                      <Button onClick={verifyOTPFunc} className="w-full">
                        Verify OTP
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEnteringOTP(false);
                        }}
                        className="w-full"
                      >
                        Go back <Undo2Icon size={18} className="ml-2" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={getOTPFunc} className="w-full">
                        Get OTP
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          router.push("/login");
                        }}
                        className="w-full"
                      >
                        Go back <Undo2Icon size={18} className="ml-2" />
                      </Button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
