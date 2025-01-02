"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import getResponse from "@/helper/getResponse";
import { handleFetch } from "./common";
import { deleteCookie } from "./cookies";
import { AppConfig } from "@/config/appConfig";

const logoutUser = async () => {
  try {
    const data = await handleFetch(
      "/api/auth/logout",
      "GET",
      undefined,
      false,
      true
    );
    await deleteCookie(AppConfig.ACCESS_TOKEN);
    await deleteCookie(AppConfig.REFRESH_TOKEN);
    await deleteCookie(AppConfig.USER_STORAGE);
    await deleteCookie(AppConfig.IS_EMAIL_VERIFIED);
    return getResponse(data, "try");
  } catch (error: any) {
    return getResponse(
      {
        message:
          error?.message || "An unexpected error occurred. Please try again.",
        status: "error",
        code: 500,
        data: undefined,
      },
      "catch"
    );
  }
};

const sendVerificationEmail = async () => {
  try {
    const data = await handleFetch(
      "/api/auth/send-verification-email",
      "GET",
      undefined,
      false,
      true
    );
    console.log(data);
    return getResponse(data, "try");
  } catch (error: any) {
    return getResponse(
      {
        message:
          error?.message || "An unexpected error occurred. Please try again.",
        status: "error",
        code: 500,
        data: undefined,
      },
      "catch"
    );
  }
};

export { logoutUser, sendVerificationEmail };
