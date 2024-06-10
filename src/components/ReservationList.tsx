import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { reservationSchemaInterface } from "../models/reservation.model";
import { orderSchemaInterface } from "../models/order.model";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "./ui/input";

interface UserInterface {
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  orders: orderSchemaInterface[];
  reservations: reservationSchemaInterface[];
}

const ReservationList = ({
  user,
  theme,
}: {
  user: UserInterface;
  theme?: string;
}) => {
  return (
    <>
      {user?.reservations && user?.reservations.length > 0 ? (
        <>
          <Carousel className="w-[88%] sm:w-[80%]" opts={{ align: "center" }}>
            <CarouselContent>
              {user?.reservations.map((reserve, index) => {
                const creationDate = new Date(
                  // @ts-ignore
                  reserve.createdAt.toLocaleString()
                ).toDateString();

                return (
                  <CarouselItem
                    key={index}
                    className=" md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card
                        className={`${
                          theme === "dark" ? "bg-[#0000003e]" : "bg-[#ffffff7b]"
                        } backdrop-blur-md shadow-md shadow-[#00000092] border-none`}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-[4%] flex-warp">
                            Reservation
                            <Badge
                              className={`pointer-events-none ${
                                reserve.status === "cancelled"
                                  ? "bg-red-600"
                                  : "bg-green-600"
                              }`}
                            >
                              {reserve.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Reservation Details :
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Date :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="date"
                              value={new Date(
                                reserve.date
                                  .split(",")[0]
                                  .split("/")
                                  .reverse()
                                  .join("/")
                              ).toDateString()}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Time :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="time"
                              value={reserve.date.split(",")[1]}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Attendees :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="attendees"
                              value={reserve.attendes}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Reservation under :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="name"
                              value={reserve.customerName}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Creation Date :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="name"
                              value={creationDate}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      ) : (
        <>
          <Carousel className="w-[88%] sm:w-[30%]" opts={{ align: "center" }}>
            <CarouselContent>
              <CarouselItem className="">
                <div className="p-1">
                  <Card
                    className={`${
                      theme === "dark" ? "bg-[#0000003e]" : "bg-[#ffffff7b]"
                    } backdrop-blur-md shadow-md shadow-[#00000092] border-none`}
                  >
                    <CardContent className="flex-center aspect-square p-6">
                      <span className="text-4xl font-semibold text-center">
                        You have no reservations
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </>
  );
};

export default ReservationList;
