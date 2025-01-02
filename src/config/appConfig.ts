export const AppConfig = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  REFRESH_TOKEN: "REFRESH_TOKEN",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  USER_STORAGE: "USER_STORAGE",
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  IS_EMAIL_VERIFIED: "IS_EMAIL_VERIFIED",
  TOASTER: "FRONTEND-TOASTER",
};

export const SocketEventName = {
  UNREAD_INVITATION: "unread invitation",
  READ_INVITATION: "mark as read invitation",
};
