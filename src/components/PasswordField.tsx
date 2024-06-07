"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({
  onChange,
  labelText,
  labelFor,
  disabled,
  className,
}: {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  labelFor?: string;
  disabled?: boolean;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={labelFor || "password"}>{labelText || "Password"}</Label>
      <div className="relative">
        <Input
          id={labelFor || "password"}
          placeholder="SecretRecipe123!"
          required={true}
          type={showPassword ? "text" : "password"}
          className={`relative disabled:cursor-default ${className}`}
          onChange={onChange}
          disabled={disabled}
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
  );
};

export default PasswordField;
