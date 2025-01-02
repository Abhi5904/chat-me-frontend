/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IUpdateUserPayload } from "@/types/user";
import { handleFetch } from "./common";
import getResponse from "@/helper/getResponse";

const updateUser = async (userId: string, payload: IUpdateUserPayload) => {
  try {
    const formData = new FormData();
    if (payload?.firstName) formData.append("firstName", payload?.firstName);
    if (payload?.lastName) formData.append("lastName", payload?.lastName);
    if (payload?.bio) formData.append("bio", payload?.bio);
    if (payload?.profilePicture)
      formData.append("profilePicture", payload?.profilePicture);
    const data = await handleFetch<IUpdateUserPayload>(
      `/api/user/${userId}`,
      "PUT",
      payload,
      false,
      true
    );
    return getResponse(data, "try");
  } catch (error: any) {
    console.log(error);
    return getResponse(
      {
        message: error?.message,
        status: "error",
        code: 500,
        data: undefined,
      },
      "catch"
    );
  }
};

const getUserByToken = async () => {
  try {
    const data = await handleFetch(
      `/api/user/token`,
      "GET",
      undefined,
      false,
      true
    );
    return getResponse(data, "try");
  } catch (error: any) {
    console.log(error);
    return getResponse(
      {
        message: error?.message,
        status: "error",
        code: 500,
        data: undefined,
      },
      "catch"
    );
  }
};

const getUser = async (userId: string) => {
  try {
    const data = await handleFetch(
      `/api/user/${userId}`,
      "GET",
      undefined,
      false,
      true
    );
    return getResponse(data, "try");
  } catch (error: any) {
    console.log(error);
    return getResponse(
      {
        message: error?.message,
        status: "error",
        code: 500,
        data: undefined,
      },
      "catch"
    );
  }
};

const getAllUsers = async () => {
  try {
    const data = await handleFetch(
      `/api/user/emailverfied`,
      "GET",
      undefined,
      false,
      true
    );
    return getResponse(data, "try");
  } catch (error: any) {
    console.log(error);
    return getResponse(
      {
        message: error?.message,
        status: "error",
        code: 500,
        data: undefined,
      },
      "catch"
    );
  }
};

const getInvitableUsers = async () => {
  try {
    const data = await handleFetch(
      `/api/user/invitable`,
      "GET",
      undefined,
      false,
      true
    );
    return getResponse(data, "try");
  } catch (error: any) {
    console.log(error);
    return getResponse(
      {
        message: error?.message,
        status: "error",
        code: 500,
        data: undefined,
      },
      "catch"
    );
  }
};

export { updateUser, getUser, getUserByToken, getAllUsers, getInvitableUsers };
