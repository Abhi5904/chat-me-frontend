import { IBack } from "@/types/common";
import { ChevronLeft } from "lucide-react";
import React from "react";

const Back = ({ handleBack }: IBack) => {
  return (
    <div
      className="cursor-pointer min-w-8 min-h-8 flex items-center justify-center hover:bg-accent rounded-full"
      onClick={handleBack}
    >
      <ChevronLeft size={22} />
    </div>
  );
};

export default Back;
