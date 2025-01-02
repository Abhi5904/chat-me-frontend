import ChatLayout from "@/components/layouts/chats/ChatLayout";
import ChatProvider from "@/context/chat";
import { SocketProvider } from "@/context/socket";
import { UserProvider } from "@/context/user";
import React from "react";

const ChatMainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SocketProvider>
      <UserProvider>
        <ChatProvider>
          <ChatLayout>{children}</ChatLayout>
        </ChatProvider>
      </UserProvider>
    </SocketProvider>
  );
};

export default ChatMainLayout;
