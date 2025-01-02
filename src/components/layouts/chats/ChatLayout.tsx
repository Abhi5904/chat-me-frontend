"use client";
import { IChatLayout, TabType } from "@/types/chat";
import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import ConversationSidebar from "../../chat/conversation/ConversationSidebar";
import ProfileSidebar from "../../chat/profile/ProfileSidebar";
import { useUser } from "@/context/user";
import Spinner from "@/components/common/Spinner";
import { getFromStorage } from "@/lib/storage";
import { LocalStorageKey } from "@/lib/utils";
import AllSettings from "@/components/chat/setting";
import Invitation from "@/components/chat/invitation/Invitation";

const ChatLayout = ({ children }: IChatLayout) => {
  const { isLoading } = useUser();
  const [tab, setTab] = useState<TabType>(() => {
    const tab = getFromStorage(LocalStorageKey.TAB);
    return tab ? tab : TabType.PROFILE;
  });
  return (
    <>
      {isLoading && (
        <div className="h-dvh w-dvw fixed top-0 left-0 bg-black/50 z-[999] flex items-center justify-center text-white">
          <Spinner size={50} />
        </div>
      )}
      <div className="relative w-full h-screen flex items-start">
        <UserSidebar setTab={setTab} tab={tab} />
        {tab === TabType.CHAT && <ConversationSidebar />}
        {tab === TabType.PROFILE && <ProfileSidebar />}
        {tab === TabType.SETTING && <AllSettings />}
        {tab === TabType.INVITATION && <Invitation />}
        <div className="w-full relative">{children}</div>
      </div>
    </>
  );
};

export default ChatLayout;
