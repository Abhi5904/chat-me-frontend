/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { AppConfig } from "@/config/appConfig";
import { getCookie } from "./cookies";

export async function handleFetch<T>(
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "HEAD" = "GET",
  data?: T,
  isForm = false,
  isNeedAuth = true
): Promise<any> {
  // Retrieve the access token if authentication is needed
  const accessToken = (await getCookie(AppConfig.ACCESS_TOKEN)) ?? "";

  // Construct headers
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(isForm ? {} : { "Content-Type": "application/json" }), // Do not set Content-Type for FormData
    ...(isNeedAuth && { Authorization: `Bearer ${accessToken}` }),
  };

  // Build the configuration object
  const config: RequestInit = {
    headers,
    method,
    credentials: "include",
    ...(method !== "GET" &&
      method !== "HEAD" && {
        body: isForm ? (data as any) : JSON.stringify(data),
      }),
  };

  // Construct the API endpoint
  const ApiEndpoint = `${AppConfig.API_URL}${url}`;
  try {
    // Make the request
    const response = await fetch(ApiEndpoint, config);
    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response?.json();
      if (errorData) {
        return {
          status: errorData?.status,
          message: errorData?.message,
          code: errorData?.code,
          details: errorData?.details,
        };
      } else {
        return {
          status: "error",
          message: "unexcepted error",
          code: 500,
        };
      }
    }

    // Parse and return JSON if available, otherwise return plain text
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    console.error("handleFetch error:", error);
    throw error; // Re-throw for upstream handling
  }
}
