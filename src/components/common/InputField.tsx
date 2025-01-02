import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IInput } from "@/types/common";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../ui/password-input";

const InputField = ({
  handleBlur,
  handleChange,
  label,
  name,
  placeholder,
  type,
  value,
  disable = false,
  error = false,
  isrequired = true,
  errorMsg = "",
  inputClassname = "",
}: IInput) => {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className="flex flex-col gap-1 w-full">
        <Label htmlFor={name}>
          {label}
          {`${isrequired ? "*" : ""}`}
        </Label>
        {type === "password" ? (
          <PasswordInput
            disabled={disable}
            id={name}
            name={name}
            // type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              inputClassname,
              error && isrequired && "border-red-400"
            )}
          />
        ) : (
          <Input
            disabled={disable}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              inputClassname,
              error && isrequired && "border-red-400"
            )}
          />
        )}
      </div>
      {error && isrequired && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}
    </div>
  );
};

export default InputField;
