"use server";

import getResponse from "@/helper/getResponse";
import { handleFetch } from "./common";

/* eslint-disable @typescript-eslint/no-explicit-any */
const getConversationByToken = async (id: string) => {
  try {
    const data = await handleFetch(
      `/api/conversation/user/${id}`,
      "GET",
      undefined,
      false,
      true
    );
    return getResponse(data, "try");
  } catch (error: any) {
    console.log(error, "error");
    return getResponse(
      {
        message:
          error?.message || "An unexpected error occurred. Please try again.",
        status: "error",
        code: error?.status || 500,
        data: undefined,
      },
      "catch"
    );
  }
};

export { getConversationByToken };
