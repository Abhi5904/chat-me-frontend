import EditProfileModal from "@/components/chat/profile/EditProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/user";
import formatTextWithLineBreaks from "@/helper/formatTextWithLineBreaks";
import getShortUserName from "@/helper/getShortUserName";
import { cn } from "@/lib/utils";
import React from "react";

const ProfileSidebar = () => {
  const { user } = useUser();
  console.log(user, "user");
  return (
    <div className="relative max-w-[400px] w-full min-w-[300px] py-5 border-r h-full overflow-y-auto">
      <div className="flex flex-col items-start w-full gap-10">
        <h1 className="px-4 text-2xl font-semibold">Profile</h1>
        <div className="flex flex-col items-start w-full px-[30px] gap-10">
          <Avatar className="cursor-pointer size-[200px] rounded-full mx-auto">
            <AvatarImage
              src={user?.profilePicture || ""}
              alt={user?.firstName}
            />
            <AvatarFallback className="text-6xl rounded-full">
              {getShortUserName(user?.firstName || "", user?.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full gap-8">
            <div className="flex items-center justify-end w-full">
              <EditProfileModal />
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="text-lg font-medium">Name</p>
                <p className="text-sm text-muted-foreground">
                  Enter your first and last name. These names can be seen by
                  your friends and help others identify you.
                </p>
              </div>
              <div className="flex items-center justify-center w-full gap-10">
                <p
                  className={cn(
                    user?.firstName
                      ? "text-foreground"
                      : "text-muted-foreground",
                    "px-2 border-b py-1 text-base w-full text-center"
                  )}
                >
                  {user?.firstName ?? "Provide first name"}
                </p>
                <p
                  className={cn(
                    user?.lastName
                      ? "text-foreground"
                      : "text-muted-foreground",
                    "px-2 border-b py-1 text-base w-full text-center"
                  )}
                >
                  {user?.lastName ?? "Provide last name"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="text-lg font-medium">About me</p>
                <p className="text-sm text-muted-foreground">
                  Share something interesting about yourself. This will help
                  others get to know you better.
                </p>
              </div>
              <p
                className={cn(
                  user?.bio ? "text-foreground" : "text-secondary-foreground",
                  "text-base"
                )}
                dangerouslySetInnerHTML={{
                  __html:
                    formatTextWithLineBreaks(user?.bio || "") ??
                    "Provide bio...",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
