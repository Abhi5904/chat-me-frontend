"use server";
import { cookies } from "next/headers";

export async function deleteCookie(cookie: string) {
  const cookieStore = await cookies();
  cookieStore.delete(cookie);
}

export async function getCookie(cookie: string) {
  const cookieStore = await cookies();
  if (cookieStore.has(cookie)) {
    const cookieData = cookieStore.get(cookie)?.value || "";
    return cookieData ? JSON.parse(cookieData) : null;
  }
}

export async function setCookie(
  cookie: string,
  value: string,
  maxAge?: number
) {
  const cookieStore = await cookies();
  cookieStore.set(cookie, JSON.stringify(value), {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}
