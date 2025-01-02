/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import getResponse from "@/helper/getResponse";
import { handleFetch } from "./common";
import { ISendInvitationPayload } from "@/types/invitation";
import { InvitationTabValue } from "../constant";

const sendInvitation = async (payload: ISendInvitationPayload) => {
  try {
    const data = await handleFetch<ISendInvitationPayload>(
      "/api/invitation",
      "POST",
      payload,
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

const getUnreadInvitation = async () => {
  try {
    const data = await handleFetch(
      "/api/invitation/unread",
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

const getAllInvitations = async (type: InvitationTabValue) => {
  try {
    const data = await handleFetch(
      `/api/invitation?type=${type}`,
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

export { sendInvitation, getUnreadInvitation, getAllInvitations };
