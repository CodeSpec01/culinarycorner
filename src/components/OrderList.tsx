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
import { ScrollArea } from "./ui/scroll-area";

interface UserInterface {
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  orders: orderSchemaInterface[];
  reservations: reservationSchemaInterface[];
}

const OrderList = ({
  user,
  theme,
}: {
  user: UserInterface;
  theme?: string;
  }) => {
  
  return (
    <>
      {user?.orders && user?.orders.length > 0 ? (
        <>
          <Carousel className="w-[88%] sm:w-[80%]" opts={{ align: "center" }}>
            <CarouselContent>
              {user?.orders.map((order, index) => {
                const creationDate = new Date(
                  //@ts-ignore
                  order.createdAt.toLocaleString()
                )

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
                            Order
                            <Badge
                              className={`pointer-events-none ${
                                creationDate.getTime() + 24 * 60 * 60 * 1000 >
                                Date.now()
                                  ? "bg-yellow-600"
                                  : "bg-green-600"
                              }`}
                            >
                              {creationDate.getTime() + 24 * 60 * 60 * 1000 >
                              Date.now()
                                ? "Pending"
                                : "Delivered"}
                            </Badge>
                          </CardTitle>
                          <CardDescription>Order Details :</CardDescription>
                        </CardHeader>
                        <CardContent className="">
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Order under :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="attendees"
                              value={order.customerName}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none w-full">
                              Ordered Items :
                            </div>
                            <ScrollArea
                              className={`bg-transparent text-wrap border rounded-lg w-full p-2 h-[150px] ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                            >
                              {/* {order.items.map(item => (item.name <br /> ))} */}
                              {order.items.map((item, index) => (
                                <p key={index}>
                                  {item.name} : <br />
                                  {item.quantity} x {item.price} - Rs.{" "}
                                  {item.quantity * item.price} <br />
                                  <br />
                                </p>
                              ))}
                            </ScrollArea>
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Order Total :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="name"
                              value={order.totalAmount}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Order Date :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent overflow-scroll ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="date"
                              value={creationDate.toDateString()}
                            />
                            <div className="flex items-center justify-center space-y-1.5"></div>
                          </div>
                          <div className="grid w-full items-center gap-2">
                            <div className="text-md pointer-events-none">
                              Delivery Date :
                            </div>
                            <Input
                              className={`pointer-events-none bg-transparent overflow-scroll ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              }`}
                              id="date"
                              value={
                                new Date(creationDate.getTime() + 24 * 60 * 60 * 1000).toDateString()
                              }
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
                        You have no orders
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

export default OrderList;
