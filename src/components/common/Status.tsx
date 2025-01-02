import capitalize from "@/helper/capitalize";
import { InvitationStatus } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { IStatus } from "@/types/common";
import React from "react";

const Status = ({ text }: IStatus) => {
  let btnClass = "";
  switch (text) {
    case InvitationStatus.DECLINE:
      btnClass = "bg-red-200 text-red-600";
      break;
    case InvitationStatus.ACCEPT:
      btnClass = "bg-green-200 text-green-600";
    case InvitationStatus.PENDING:
      btnClass = "bg-yellow-200 text-yellow-600";
  }
  return (
    <div
      className={cn(
        btnClass,
        "w-fit px-3 py-0.5 text-center text-xs leading-6 font-medium rounded-full "
      )}
    >
      {capitalize(text || "")}
    </div>
  );
};

export default Status;
