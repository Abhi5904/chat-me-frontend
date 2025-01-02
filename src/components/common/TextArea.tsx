import React from "react";
import { Label } from "../ui/label";
import { ITextArea } from "@/types/common";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const TextAreaField = ({
  handleBlur,
  handleChange,
  label,
  name,
  placeholder,
  value,
  disable = false,
  error = false,
  isrequired = true,
  errorMsg = "",
  textAreaClassname = "",
}: ITextArea) => {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className="flex flex-col gap-1 w-full">
        <Label htmlFor={name}>
          {label}
          {`${isrequired ? "*" : ""}`}
        </Label>
        <Textarea
          disabled={disable}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            textAreaClassname,
            error && isrequired && "border-red-400"
          )}
        />
      </div>
      {error && isrequired && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}
    </div>
  );
};

export default TextAreaField;
