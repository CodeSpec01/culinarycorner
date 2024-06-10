"use client";

import React, { useState } from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, Copy, Router, Undo2Icon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { time } from "../utils/constants";
import Loading from "./Loading";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { useRouter } from "next/navigation";

const Reservation = ({ theme }: { theme: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const date = new Date();
  date.setHours(0, 0, 0);
  const [details, setDetails] = useState({
    customerName: "",
    attendes: 1,
    date: date,
  });
  const [loading, setLoading] = useState(false);
  const [isEnteringOtp, setIsEnteringOtp] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [email, setEmail] = useState("");

  const reservationFunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (
      details.date < new Date() ||
      (details.date.getHours() <= 9 && details.date.getMinutes() !== 30) ||
      ((details.date.getDay() === 6 || details.date.getDay() === 0) &&
        details.date.getHours() > 23) ||
      (details.date.getDay() !== 6 &&
        details.date.getDay() !== 0 &&
        details.date.getHours() > 21)
    ) {
      setLoading(false);
      setErrorMsg(
        "Invalid Reservation timings, please reselect time for reservations."
      );
      return;
    }

    const res = await fetch("/api/user/quickData", {
      method: "GET",
    });

    if (!res.ok) {
      setLoading(false);
      setErrorMsg("Please Login to make a reservation");
      return;
    }

    const resJson = await res.json();
    setEmail(resJson.data.data.email);

    const available = await fetch(
      `/api/reservation/?date=${details.date.toLocaleString()}&attendees=${
        details.attendes
      }&email=${resJson.data.data.email}`,
      {
        method: "GET",
      }
    );

    const availableJson = await available.json();

    if (!available.ok) {
      setLoading(false);
      setErrorMsg(availableJson.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(availableJson.message + "-");
    setIsEnteringOtp(true);
  };

  const verifyOtpFunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    if (!otp) {
      setLoading(false);
      setErrorMsg("OTP is required!");
      return;
    }

    const res = await fetch(`/api/reservation/?email=${email}`, {
      method: "POST",
      body: JSON.stringify({
        customerName: details.customerName,
        attendees: details.attendes,
        date: details.date.toLocaleString(),
      }),
    });

    const resJson = await res.json();

    if (!res.ok) {
      setLoading(false);
      setErrorMsg(resJson.message);
      return;
    }

    setButtonDisabled(true);
    setLoading(false);
    setSuccessMsg(resJson.message + "-redirecting to profile page");
    setTimeout(() => {
      router.push("/profile");
    }, 2000);
  };

  return (
    <div
      id="reservation"
      className={` flex flex-col items-center pt-[22vw] sm:pt-[15vw] md:pt-[12vw] lg:pt-[8vw] gap-16 ${
        theme === "dark" ? "bg-[#6461619c]" : "bg-[#e0d7d2]"
      }`}
    >
      <div className="flex-col flex-center gap-10">
        <div className="flex-center md:gap-8 w-full">
          <Separator
            className={`inline w-0 sm:w-[20vw] ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
          <h2 className="text-5xl sm:text-6xl font-serif font-semibold text-center leading-[55px]">
            Save Your Seat
          </h2>
          <Separator
            className={`inline w-0 sm:w-[20vw] ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
        </div>

        <p className="text-slate-400 text-center">
          Reserve your spot for an unforgettable dining experience.
        </p>
        <p className="w-[90%] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
          Ensure you have a seat at our exclusive restaurant by making a
          reservation. Our chefs are ready to provide you with a memorable
          culinary adventure, tailored to your preferences. Book your table now
          and savor the finest flavors we have to offer.
        </p>
      </div>

      <div className="w-full relative py-10 flex-center">
        <Image
          src={"/images/reservation.png"}
          fill
          sizes="auto"
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="reservation bg"
          className={`${theme === "dark" ? "brightness-50" : "brightness-105"}`}
        />

        <div className="z-20 flex-center">
          <Tabs
            defaultValue="online"
            className="w-full flex-col flex justify-center"
          >
            <TabsList className="grid w-full grid-cols-2 gap-3 shadow-md shadow-black">
              <TabsTrigger value="online">Online Reservation</TabsTrigger>
              <TabsTrigger value="telephone">Manual Reservation</TabsTrigger>
            </TabsList>
            <TabsContent value="online">
              <Card className=" flex-col flex justify-center shadow-md shadow-black">
                <CardHeader>
                  <CardTitle className="text-center">
                    Online Reservation
                  </CardTitle>
                  <CardDescription>
                    Make your reservation online with ease.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {isEnteringOtp ? (
                    <>
                      <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="otp">Enter OTP for confirmation</Label>
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
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          required
                          value={details.customerName}
                          onChange={(e) => {
                            setDetails((prev) => ({
                              ...prev,
                              customerName: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="attendes">Number of Attendees</Label>
                        <Input
                          id="attendes"
                          type="number"
                          required
                          value={details.attendes}
                          onChange={(e) => {
                            setDetails((prev) => ({
                              ...prev,
                              attendes: Number(e.target.value),
                            }));
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="date">Pick date for Reservation</Label>
                        <Popover>
                          <PopoverTrigger asChild className="w-full">
                            <Button
                              variant={"outline"}
                              className={`
                            "w-full justify-start text-left font-normal",
                            ${!details.date && "text-muted-foreground"}
                            `}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {details.date ? (
                                format(details.date, "PPPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={details.date}
                              onSelect={(e) => {
                                if (e) {
                                  const newDate = new Date(e!);
                                  newDate.setHours(details.date.getHours());
                                  newDate.setMinutes(details.date.getMinutes());
                                  setDetails((prev) => ({
                                    ...prev,
                                    date: newDate,
                                  }));
                                }
                              }}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              initialFocus
                            ></Calendar>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="time">
                          Choose time for Reservation
                        </Label>
                        <Select
                          onValueChange={(e) => {
                            const timeArray = e.split(":");
                            details.date.setHours(
                              Number(timeArray[0]),
                              Number(timeArray[1].slice(0, 2))
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup className="h-[30vh] w-full">
                              {details.date.getDay() != 0 &&
                              details.date.getDay() != 6 ? (
                                <>
                                  {time.map((individualTime, index) => (
                                    <>
                                      {index < 24 && (
                                        <SelectItem
                                          value={individualTime}
                                          key={index}
                                          className=" w-full text-center"
                                        >
                                          {individualTime}
                                        </SelectItem>
                                      )}
                                    </>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {time.map((individualTime, index) => (
                                    <SelectItem
                                      value={individualTime}
                                      key={index}
                                      className="w-full text-center"
                                    >
                                      {individualTime}
                                    </SelectItem>
                                  ))}
                                </>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
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
                </CardContent>
                <CardFooter className="w-full">
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
                        <div className="w-full flex flex-col gap-4">
                          <Button
                            onClick={verifyOtpFunc}
                            className="w-full"
                            disabled={buttonDisabled}
                          >
                            Verify OTP
                          </Button>
                          <Button
                            variant="destructive"
                            disabled={buttonDisabled}
                            onClick={() => {
                              setIsEnteringOtp(false);
                              setSuccessMsg("");
                              setErrorMsg("");
                            }}
                            className="w-full"
                          >
                            Go back <Undo2Icon size={18} className="ml-2" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button className="w-full" onClick={reservationFunc}>
                            Make Reservation
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="telephone">
              <Card className=" flex-col flex justify-center">
                <CardHeader>
                  <CardTitle className="text-center">
                    Telephone Reservation
                  </CardTitle>
                  <CardDescription>
                    Contact here to reserve your table
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label
                      htmlFor="current"
                      className="flex items-center gap-2"
                    >
                      +91 98732-16540
                      <Copy
                        size={17}
                        className="cursor-pointer"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            "+91 98732-16540"
                          );
                          toast({ title: "Text Copied" });
                        }}
                      />
                    </Label>
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="current"
                      className="flex items-center gap-2"
                    >
                      91-11-1234 5678
                      <Copy
                        size={17}
                        className="cursor-pointer"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            "91-11-1234 5678"
                          );
                          toast({ title: "Text Copied" });
                        }}
                      />
                    </Label>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new" className="flex items-center gap-2">
                      reservation@culinarycuisine.com
                      <Copy
                        size={17}
                        className="cursor-pointer"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            "reservation@culinarycuisine.com"
                          );
                          toast({ title: "Text Copied" });
                        }}
                      />
                    </Label>
                  </div>
                  <CardHeader>
                    <CardDescription>
                      Contact here for any additional information
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-1">
                    <Label
                      htmlFor="current"
                      className="flex items-center gap-2"
                    >
                      help@culinarycuisine.com
                      <Copy
                        size={17}
                        className="cursor-pointer"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            "support@culinarycuisine.com"
                          );
                          toast({ title: "Text Copied" });
                        }}
                      />
                    </Label>
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="current"
                      className="flex items-center gap-2"
                    >
                      support@culinarycuisine.com
                      <Copy
                        size={17}
                        className="cursor-pointer"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            "support@culinarycuisine.com"
                          );
                          toast({ title: "Text Copied" });
                        }}
                      />
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
