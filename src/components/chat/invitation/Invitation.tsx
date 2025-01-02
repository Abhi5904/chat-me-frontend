import Spinner from "@/components/common/Spinner";
import Status from "@/components/common/Status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user";
import getShortUserName from "@/helper/getShortUserName";
import { getAllInvitations } from "@/lib/apis/invitation";
import { InvitationTab, InvitationTabValue } from "@/lib/constant";
import { IReceiveInvitations, ISendInvitations } from "@/types/invitation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Invitation = () => {
  const { user } = useUser();
  const [sendInvitations, setSendInvitations] = useState<
    ISendInvitations[] | null
  >(null);
  const [receiveInvitations, setReceiveInvitations] = useState<
    IReceiveInvitations[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const [tab, setTab] = useState<InvitationTabValue>(InvitationTabValue.SEND);

  useEffect(() => {
    const fetchAllInvitations = async () => {
      try {
        setIsSpinner(true);
        const response = await getAllInvitations(tab);
        if (response?.success) {
          setError(null);
          if (tab === InvitationTabValue.SEND) {
            setSendInvitations(response?.data);
          } else {
            setReceiveInvitations(response?.data);
          }
        } else {
          setSendInvitations(null);
          setReceiveInvitations(null);
          setError(response?.message);
        }
      } catch (error) {
        setSendInvitations(null);
        setReceiveInvitations(null);
        setError("An unexpected error while get all invitations");
        console.log(error, "An unexpected error while get all invitations");
      } finally {
        setIsSpinner(false);
      }
    };
    if (user) fetchAllInvitations();
  }, [user, tab]);

  return (
    <div className="relative max-w-[400px] w-full min-w-[300px] border-r h-full overflow-y-auto">
      <div className="flex flex-col items-start w-full gap-5 px-4 border-b pb-2 pt-5">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-semibold">Invitations</h1>
        </div>
        <div className="w-full">
          <Input
            type="text"
            placeholder="Search invitations..."
            disabled={typeof error === "string"}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 justify-start w-full mt-2 px-4">
        {InvitationTab &&
          InvitationTab?.length > 0 &&
          InvitationTab?.map((data, index) => (
            <Button
              variant={data?.value === tab ? "default" : "outline"}
              key={index}
              className="rounded-full h-auto px-3 py-1 text-xs font-medium"
              onClick={() => setTab(data?.value)}
            >
              {data?.name}
            </Button>
          ))}
      </div>
      {isSpinner ? (
        <div className="flex items-center justify-center h-[calc(100%-152px)] w-full">
          <Spinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center w-full h-[calc(100%-152px)]">
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      ) : (
        (sendInvitations || receiveInvitations) && (
          <div className="flex flex-col justify-start w-full h-[calc(100%-152px)] overflow-y-auto">
            {tab === InvitationTabValue.SEND
              ? sendInvitations?.map((data) => (
                  <div
                    key={data?._id}
                    className="flex items-center justify-between gap-3 w-full border-b p-4 hover:bg-accent"
                  >
                    <div className="flex items-center justify-start gap-3">
                      <div className="flex items-center justify-center rounded-full min-w-10 min-h-10 border hover:bg-accent">
                        {data?.receiverId?.profilePicture ? (
                          <Image
                            src={data?.receiverId?.profilePicture}
                            alt={data?.receiverId?.userName}
                            width={40}
                            height={40}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <p className="text-center font-medium text-sm">
                            {getShortUserName(
                              data?.receiverId?.firstName || "",
                              data?.receiverId?.lastName
                            )}
                          </p>
                        )}
                      </div>
                      <p className="text-sm">
                        {data?.receiverId?.firstName}(
                        {data?.receiverId?.userName})
                      </p>
                    </div>
                    <Status text={data?.status} />
                  </div>
                ))
              : receiveInvitations?.map((data) => (
                  <div
                    key={data?._id}
                    className="flex items-center justify-between gap-3 w-full border-b p-4 hover:bg-accent"
                  >
                    <div className="flex items-center justify-start gap-3">
                      <div className="flex items-center justify-center rounded-full min-w-10 min-h-10 border hover:bg-accent">
                        {data?.senderId?.profilePicture ? (
                          <Image
                            src={data?.senderId?.profilePicture}
                            alt={data?.senderId?.userName}
                            width={40}
                            height={40}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <p className="text-center font-medium text-sm">
                            {getShortUserName(
                              data?.senderId?.firstName || "",
                              data?.senderId?.lastName
                            )}
                          </p>
                        )}
                      </div>
                      <p className="text-sm">
                        {data?.senderId?.firstName}({data?.senderId?.userName})
                      </p>
                    </div>
                    <Status text={data?.status} />
                  </div>
                ))}
          </div>
        )
      )}
    </div>
  );
};

export default Invitation;
