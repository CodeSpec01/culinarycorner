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
import { CalendarIcon, Copy } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useToast } from "./ui/use-toast";

const Reservation = ({ theme }: { theme: string }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
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
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="reservation bg"
          className={`${theme === "dark" ? "brightness-50" : "brightness-105"}`}
        />

        <div className="z-20 flex-center">
          <Tabs
            defaultValue="online"
            className="w-[90%] flex-col flex justify-center"
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
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="attendes">Number of Attendees</Label>
                    <Input
                      id="attendes"
                      defaultValue="1"
                      type="number"
                      required
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
                            ${!date && "text-muted-foreground"}
                          `}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // Clear the time part
                            return date < today;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
                <CardFooter className="w-full">
                  <Button className="w-full" >Save changes</Button>
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
