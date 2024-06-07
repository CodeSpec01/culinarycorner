import React, { useState } from "react";
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
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Loading from "./Loading";

const Login = () => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [user, setUser] = useState({
    identifierType: "",
    identifier: "",
    password: "",
  });

  const Loginfunc = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    if (user.identifierType === "") {
      setLoading(false);
      setErrorMsg("Either Email or Username is required");
      return;
    }
    if (user.identifierType === "username") {
      if (!user.identifier) {
        setLoading(false);
        setErrorMsg("Username is required !");
        return;
      }
      if (!usernameRegex.test(user.identifier)) {
        setLoading(false);
        setErrorMsg("Username can only consist of alphabets and numbers");
        return;
      }
    }
    if (user.identifierType === "email") {
      if (!user.identifier) {
        setLoading(false);
        setErrorMsg("email is required !");
        return;
      }
      if (!emailRegex.test(user.identifier)) {
        setLoading(false);
        setErrorMsg("Invalid Email");
        return;
      }
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

    const res = await fetch("/api/user/login", {
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

    const emailResponse = await fetch("/api/user/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: resJson.data.username,
        email: resJson.data.email,
        emailType: "Verify",
      }),
    });

    if (!emailResponse.ok) {
      setLoading(false);
      setErrorMsg(resJson.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(resJson.message + "-redirecting to home page ....");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <Card className="w-[350px] z-20">
      <CardHeader>
        <CardTitle className="text-center">Log In</CardTitle>
        <CardDescription className="text-center">Welcome Back.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="w-full mb-[5%]">
            <TabsTrigger value="email" className="w-[50%]">
              Email
            </TabsTrigger>
            <TabsTrigger value="username" className="w-[50%]">
              Username
            </TabsTrigger>
          </TabsList>
          <form>
            <TabsContent value="username">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="CoolChef01"
                    onChange={(e) => {
                      user.identifierType = "username";
                      setUser((prev) => ({
                        ...user,
                        identifier: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="SecretRecipe123!"
                      required={true}
                      type={showPassword ? "text" : "password"}
                      className="relative"
                      onChange={(e) => {
                        setUser(() => ({
                          ...user,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <div
                      className="h-full w-[13%] cursor-pointer absolute right-0 top-0 backdrop-blur-xl flex-center rounded-md"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {!showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">email</Label>
                  <Input
                    id="email"
                    placeholder="chef@example.com"
                    required={true}
                    type="email"
                    onChange={(e) => {
                      user.identifierType = "email";
                      setUser(() => ({
                        ...user,
                        identifier: e.target.value.toLowerCase(),
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="SecretRecipe123!"
                      required={true}
                      type={showPassword ? "text" : "password"}
                      className="relative"
                      onChange={(e) => {
                        setUser(() => ({
                          ...user,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <div
                      className="h-full w-[13%] cursor-pointer absolute right-0 top-0 backdrop-blur-xl flex-center rounded-md"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {!showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </div>
                  </div>
                </div>
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
            <Button onClick={Loginfunc} className="w-full">
              Log In
            </Button>
            <div className="flex justify-between gap-5 w-full">
              <Button variant="link" onClick={Loginfunc}>
                Forgot Password
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Login;
