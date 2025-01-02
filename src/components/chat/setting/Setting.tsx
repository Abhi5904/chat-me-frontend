/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/common/Spinner";
import { toast } from "@/hooks/use-toast";
import { logoutUser } from "@/lib/apis/auth";
import { cn } from "@/lib/utils";
import { ISetting, SettingTabType } from "@/types/setting";
import { CircleUserRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Setting = ({ setSettingTab }: ISetting) => {
  const router = useRouter();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const handleLogout = async () => {
    if (isSpinner) return;
    try {
      setIsSpinner(true);
      const data = await logoutUser();
      if (data?.success) {
        router.push("/auth/login");
        toast({
          title: data?.title,
          description: data?.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: data?.title,
          description: data?.message,
        });
      }
    } catch (error: any) {
      console.log(error, "error client");
      const errorMessage =
        error instanceof Error
          ? error.message // If it's a standard JavaScript error
          : "An unexpected error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsSpinner(false);
    }
  };
  return (
    <div className="flex flex-col items-start w-full gap-5 h-full">
      <h1 className="px-4 text-2xl font-semibold">Setting</h1>
      <div className="flex flex-col items-center w-full justify-between h-full">
        <div className="flex flex-col items-start w-full">
          <div
            onClick={() => setSettingTab(SettingTabType.ACCOUNT)}
            className="w-full flex items-center justify-start gap-5 px-4 border-y py-4 cursor-pointer hover:bg-accent"
          >
            <div className="max-w-6 w-full">
              <CircleUserRound
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-base">Account</p>
          </div>
        </div>
        <div
          onClick={handleLogout}
          className={cn(
            isSpinner ? "justify-center" : "justify-start",
            "w-full flex items-center gap-5 px-4 border-y py-4 cursor-pointer hover:bg-accent"
          )}
        >
          {isSpinner ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <>
              <div className="max-w-6 w-full text-destructive">
                <LogOut size={24} color="currentColor" strokeWidth={1.5} />
              </div>
              <p className="text-destructive">Logout</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
