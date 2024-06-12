"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import {
  ShoppingCartIcon,
  SquareMinus,
  SquarePlus,
  Undo2Icon,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

interface CartInterface {
  image: string;
  name: string;
  tags: string[];
  quantity: number;
  price: number;
}

const Cart = ({
  theme,
  cart,
  setCart,
  netTotal,
  setNetTotal,
}: {
  theme: string;
  cart: CartInterface[];
  setCart: React.Dispatch<React.SetStateAction<CartInterface[]>>;
  netTotal: number;
  setNetTotal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEnteringOtp, setIsEnteringOtp] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleOrder = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const res = await fetch("/api/user/quickData", {
      method: "GET",
    });

    const resJson = await res.json();
    if (!res.ok) {
      setLoading(false);
      setErrorMessage("Please login to make online order");
      return;
    }

    setEmail(resJson.data.data.email);

    const response = await fetch(
      `/api/order/?email=${resJson.data.data.email}`,
      {
        method: "GET",
      }
    );

    const responseJson = await response.json();
    if (!response.ok) {
      setLoading(false);
      setErrorMessage(responseJson.message);
      return;
    }

    setIsEnteringOtp(true);
    setSuccessMessage(responseJson.message + "-");
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    if (!otp) {
      setLoading(false);
      setErrorMessage("OTP is required!");
      return;
    }

    const newCart = cart.map(({ image, tags, ...rest }) => rest);

    console.log(newCart);

    const res = await fetch(`/api/order/?email=${email}`, {
      method: "POST",
      body: JSON.stringify({
        otp: otp,
        cart: cart.map(({ image, tags, ...rest }) => rest),
        netTotal: netTotal,
      }),
    });

    const resJson = await res.json();

    if (!res.ok) {
      setLoading(false);
      setErrorMessage(resJson.message);
      return;
    }

    setButtonDisabled(true);
    setLoading(false);
    setSuccessMessage(resJson.message + "-redirecting to profile page");
    setTimeout(() => {
      router.push("/profile");
    }, 2000);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="fixed bottom-[5vh] right-[3vw] flex-center z-50 ">
          <Button
            variant={"default"}
            className="bg-blue-500 text-white py-6 text-xl hover:bg-blue-600"
          >
            <ShoppingCartIcon size={30} /> &nbsp; Go to cart
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] border-none">
        <DrawerHeader className="flex-col flex-center">
          <DrawerTitle className="text-4xl">
            {isEnteringOtp ? "Order Confirmation" : "Your Selections"}
          </DrawerTitle>
          <DrawerDescription>
            {isEnteringOtp
              ? "Enter the OTP to confirm your order"
              : "Ready to savor your picks? Here's what you've chosen !"}
          </DrawerDescription>
        </DrawerHeader>
        {isEnteringOtp ? (
          <>
            <div className="flex-center pt-10 flex-col space-y-1.5 w-full sm:h-[50%] ">
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
            <ScrollArea className="border w-full h-[60%] rounded-md border-none">
              <div className="flex-center flex-col gap-6 py-3">
                {cart.length === 0 && (
                  <Card className="">
                    <CardHeader>
                      <CardTitle>Empty Cart</CardTitle>
                    </CardHeader>
                  </Card>
                )}
                {cart.length > 0 &&
                  cart.map((item, index) => (
                    <Card
                      className={`w-[97%] md:w-[70%] shadow-[0_0_10px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row ${
                        theme === "dark" ? "bg-[#333337d4]" : "bg-[#f6f6f6]"
                      }`}
                      key={index}
                    >
                      <div className="h-[30vh] sm:h-auto sm:w-[40%] relative ">
                        <Image
                          src={item.image}
                          alt="food item"
                          fill
                          sizes="auto"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          className="absolute sm:rounded-bl-[10px] rounded-bl-none rounded-tl-[10px] rounded-tr-[10px] sm:rounded-tr-none "
                        />
                      </div>
                      <div className="w-[60%]">
                        <CardHeader className="flex-col flex gap-4">
                          <CardTitle>
                            <div className="flex flex-col space-y-1.5">
                              <p
                                id="name"
                                className={`bg-transparent font-serif text-3xl sm:text-5xl ${
                                  theme === "dark"
                                    ? "border-white"
                                    : "border-black"
                                }`}
                              >
                                {item.name}
                              </p>
                            </div>
                          </CardTitle>
                          <div className="flex items-center justify-start gap-3">
                            {item.tags.map((tag, index) => (
                              <Badge
                                variant={"outline"}
                                className={` capitalize text-nowrap ${
                                  theme === "dark"
                                    ? "border-white"
                                    : "border-black"
                                }`}
                                key={index}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>
                        <CardFooter className="flex justify-center items-start gap-4 w-full flex-col">
                          <div className="gap-3 flex flex-wrap justify-start items-start">
                            <p className="text-lg sm:text-3xl font-semibold">
                              Quantity:
                            </p>
                            <div className="flex gap-2 w-44">
                              <SquareMinus
                                size={"40px"}
                                className="cursor-pointer"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    item.quantity--;
                                    const newCart = [...cart];
                                    setCart(newCart);
                                    setNetTotal((prev) => prev - item.price);
                                  }
                                }}
                              />
                              <Input
                                className={`bg-transparent max-w-[70px] text-center text-lg font-semibold py-0 px-0 pointer-events-none ${
                                  theme === "dark"
                                    ? "border-white"
                                    : "border-black"
                                }`}
                                value={item.quantity}
                                readOnly
                              />
                              <SquarePlus
                                size={40}
                                className="cursor-pointer"
                                onClick={() => {
                                  if (item.quantity < 10) {
                                    item.quantity++;
                                    const newCart = [...cart];
                                    setCart(newCart);
                                    setNetTotal((prev) => prev + item.price);
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="gap-3 flex flex-wrap justify-start items-start">
                            <p className="text-lg sm:text-3xl font-semibold text-start">
                              Total Price:
                            </p>
                            <Input
                              className={`bg-transparent w-[150px] text-green-500 text-center text-lg font-semibold max-w-fit pointer-events-none ${
                                theme === "dark"
                                  ? "border-white"
                                  : "border-black"
                              } `}
                              value={item.price * item.quantity}
                              readOnly
                            />
                          </div>
                          <Button
                            className="text-lg sm:text-xl "
                            variant={"destructive"}
                            onClick={() => {
                              setCart(
                                cart.filter(
                                  (cartItem) => cartItem.name !== item.name
                                )
                              );
                              setNetTotal(
                                (prev) => prev - item.price * item.quantity
                              );
                            }}
                          >
                            Remove from Cart
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
            {cart.length > 0 && (
              <div className="gap-3 flex-center flex-wrap pt-5">
                <p className="text-lg sm:text-3xl font-semibold text-start">
                  Total Amount:
                </p>
                <Input
                  className={`bg-transparent w-[150px] text-green-500 text-center text-lg font-semibold max-w-fit pointer-events-none ${
                    theme === "dark" ? "border-white" : "border-black"
                  } `}
                  value={netTotal}
                  readOnly
                />
              </div>
            )}
          </>
        )}
        <DrawerFooter className="flex-center flex-col">
          <p
            className={`text-xs ${
              errorMessage ? "text-red-500" : "text-green-500"
            }`}
          >
            {errorMessage
              ? errorMessage
              : `${successMessage!.slice(0, successMessage?.indexOf("-"))}`}
            <br />
            {successMessage?.slice(successMessage?.indexOf("-") + 1)}
          </p>
          {loading ? (
            <>
            
              <Loading className="relative bottom-9 h-[50px] " width="60px" />
            </>
          ) : (
            <>
              {isEnteringOtp ? (
                <>
                  <div className="w-full flex-center flex-col gap-4">
                    <Button
                      onClick={verifyOtp}
                      className="w-full sm:w-[50%]"
                      disabled={buttonDisabled}
                    >
                      Verify OTP
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={buttonDisabled}
                      onClick={() => {
                        setIsEnteringOtp(false);
                        setSuccessMessage("");
                        setErrorMessage("");
                      }}
                      className="w-full sm:w-[50%]"
                    >
                      Go back <Undo2Icon size={18} className="ml-2" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    className="w-full sm:w-[50%] bg-green-500 hover:bg-green-600 "
                    disabled={cart.length === 0}
                    onClick={handleOrder}
                  >
                    Order Now
                  </Button>
                  <div className="w-full sm:w-[50%] flex items-center justify-between">
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        setCart([]);
                        setNetTotal(0);
                      }}
                      disabled={cart.length === 0}
                    >
                      Empty Cart
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Close Cart</Button>
                    </DrawerClose>
                  </div>
                </>
              )}
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
