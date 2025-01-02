"use client";
import VerifyEmailModal from "@/components/chat/setting/VerifyEmailModal";
import { ModeToggle } from "@/components/common/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SocketEventName } from "@/config/appConfig";
import { useSocket } from "@/context/socket";
import { useUser } from "@/context/user";
import getShortUserName from "@/helper/getShortUserName";
import { getUnreadInvitation } from "@/lib/apis/invitation";
import { setToStorage } from "@/lib/storage";
import { LocalStorageKey } from "@/lib/utils";
import { IUserSidebar, TabType } from "@/types/chat";
import { ClipboardList, MessageSquare, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";

const UserSidebar = ({ setTab, tab }: IUserSidebar) => {
  const { user } = useUser();
  const { socket } = useSocket();
  const [unreadInvitation, setUnreadInvitation] = useState<number | null>(null);

  const handleChangeTab = (tab: TabType) => {
    setTab(tab);
    setToStorage(LocalStorageKey.TAB, tab);
  };

  useEffect(() => {
    console.log("event", `${SocketEventName.READ_INVITATION}-${user?._id}`);
    if (socket && user) {
      socket.on(`${SocketEventName.UNREAD_INVITATION}-${user?._id}`, (data) => {
        console.log(data, "un read event");
        setUnreadInvitation(data?.unreadCount);
      });
      socket.on(`${SocketEventName.READ_INVITATION}-${user?._id}`, (data) => {
        console.log(data, "read event");
        setUnreadInvitation(data?.unreadCount);
      });
    }
  }, [user, socket]);

  useEffect(() => {
    const fetchUnreadInvitations = async () => {
      try {
        const response = await getUnreadInvitation();
        if (response?.success) {
          setUnreadInvitation(response?.data?.unReadCount);
        } else {
          console.log(
            "An unexpected error while get unread invitation",
            response?.message
          );
        }
      } catch (error) {
        console.log(error, "An unexpected error while get unread invitation");
      }
    };
    if (user) fetchUnreadInvitations();
  }, [user]);
  return (
    <>
      <div className="relative w-fit h-full py-5 px-3 border-r">
        <div className="flex flex-col items-center justify-between w-full h-full">
          <div className="flex flex-col items-center justify-start gap-3">
            <ModeToggle dropdownAlign="start" />
            <Button
              variant={tab === TabType.CHAT ? "default" : "outline"}
              size="icon"
              onClick={() => handleChangeTab(TabType.CHAT)}
            >
              <MessageSquare size={18} color="currentColor" />
            </Button>
            <Button
              variant={tab === TabType.INVITATION ? "default" : "outline"}
              size="icon"
              onClick={() => handleChangeTab(TabType.INVITATION)}
              className="relative"
            >
              <ClipboardList size={18} color="currentColor" />
              {unreadInvitation && unreadInvitation > 0 ? (
                <div className="absolute text-white bg-destructive rounded-full w-5 h-5 flex items-center justify-center text-xs -top-2 -right-2">
                  {unreadInvitation}
                </div>
              ) : null}
            </Button>
          </div>
          <div className="flex flex-col items-center justify-end w-full gap-3">
            <Button
              variant={tab === TabType.SETTING ? "default" : "outline"}
              size="icon"
              onClick={() => handleChangeTab(TabType.SETTING)}
            >
              <Settings size={18} color="currentColor" />
            </Button>
            <Avatar
              className="cursor-pointer"
              onClick={() => handleChangeTab(TabType.PROFILE)}
            >
              <AvatarImage
                src={user?.profilePicture || ""}
                alt={user?.firstName}
              />
              <AvatarFallback>
                {getShortUserName(user?.firstName || "", user?.lastName)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <VerifyEmailModal />
    </>
  );
};

export default UserSidebar;
