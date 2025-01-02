import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/user";
import getShortUserName from "@/helper/getShortUserName";
import { toast } from "@/hooks/use-toast";
import { sendInvitation } from "@/lib/apis/invitation";
import { getInvitableUsers } from "@/lib/apis/user";
import { IUser } from "@/types/auth";
import { IInviteFriendsModal, ISelectedUser } from "@/types/chat";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InviteFriendsModal = ({
  isOpenInviteFriendsModal,
  setIsOpenInviteFriendsModal,
}: IInviteFriendsModal) => {
  const { user } = useUser();
  const [isSpinner, setIsSpinner] = useState<boolean>(true);
  const [isInviteSpinner, setIsInviteSpinner] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<ISelectedUser[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedUsers((prev) => {
      if (checked) {
        return [
          ...prev,
          {
            receiverId: id,
            message: "Hey! I'd like to invite you to join us.",
          },
        ];
      } else {
        return prev.filter((user) => user.receiverId !== id);
      }
    });
  };

  const handleMessageChange = (userId: string, message: string) => {
    setSelectedUsers((prev) =>
      prev.map((user) =>
        user.receiverId === userId ? { ...user, message } : user
      )
    );
  };

  const handleSendInvitation = async () => {
    try {
      setIsInviteSpinner(true);
      if (selectedUsers?.length === 0) return;

      const payload = {
        senderId: user?._id || "",
        invitations: selectedUsers,
      };
      const response = await sendInvitation(payload);
      if (response?.success) {
        setIsOpenInviteFriendsModal(false);
        toast({
          title: "Success",
          description: response?.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            response?.message ||
            "An unexpected error occurred while sending the invitation. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred while sending the invitation. Please try again.",
      });
    } finally {
      setIsInviteSpinner(false);
    }
  };

  useEffect(() => {
    const fetchVerifiedEmailUSers = async () => {
      if (!isOpenInviteFriendsModal) return;
      try {
        setIsSpinner(true);
        const data = await getInvitableUsers();
        console.log(data);
        if (data?.success) {
          if (data?.data?.length === 0) {
            setError("There is no user availabel on this platfrom");
          } else {
            setUsers(data?.data);
          }
        } else {
          setError(data?.message);
          toast({
            variant: "destructive",
            title: "Failed to fetch users",
            description: "There was an issue to fetch users. Please try again.",
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Failed to fetch users",
          description:
            "An unexpected error occurred while fetch users. Please try again.",
        });
      } finally {
        setIsSpinner(false);
      }
    };
    fetchVerifiedEmailUSers();
  }, [isOpenInviteFriendsModal]);

  return (
    <Dialog
      open={isOpenInviteFriendsModal}
      onOpenChange={(open) => {
        setIsOpenInviteFriendsModal(open);
      }}
    >
      <DialogContent className="sm:max-w-md md:max-w-xl !p-0 !gap-0">
        <DialogHeader className="border-b clear-start p-4">
          <DialogTitle>Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="h-[40dvh] w-full overflow-y-auto">
          {isSpinner ? (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-base text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="flex flex-col items-start w-full">
              {users &&
                users?.length > 0 &&
                users?.map((user) => {
                  const isChecked =
                    selectedUsers?.length > 0
                      ? selectedUsers?.some(
                          (data) => data?.receiverId === user?._id
                        )
                      : false;
                  return (
                    <div
                      className="flex flex-col items-start w-full gap-2 last:border-none border-b py-2 px-4"
                      key={user?._id}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-start gap-3 w-full">
                          <div className="flex items-center justify-center rounded-full min-w-10 min-h-10 border hover:bg-accent">
                            {user?.profilePicture ? (
                              <Image
                                src={user?.profilePicture}
                                alt={user?.userName}
                                width={40}
                                height={40}
                                className="object-cover rounded-full"
                              />
                            ) : (
                              <p className="text-center font-medium text-sm">
                                {getShortUserName(
                                  user?.firstName || "",
                                  user?.lastName
                                )}
                              </p>
                            )}
                          </div>
                          <p className="text-sm">
                            {user?.firstName}({user?.userName})
                          </p>
                        </div>
                        <Checkbox
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(user?._id, !!checked)
                          }
                          checked={isChecked}
                        />
                      </div>
                      {isChecked && (
                        <Textarea
                          placeholder="Enter your message here..."
                          value={
                            selectedUsers.find(
                              (data) => data.receiverId === user?._id
                            )?.message || ""
                          }
                          onChange={(e) =>
                            handleMessageChange(user?._id, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-end w-full border-t p-4">
          <Button
            disabled={isSpinner || isInviteSpinner}
            type="button"
            onClick={handleSendInvitation}
            className="text-center !max-w-[132px] justify-center !w-full"
          >
            {isInviteSpinner ? <Spinner /> : "Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFriendsModal;
