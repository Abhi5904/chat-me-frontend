import Back from "@/components/common/Back";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user";
import { toast } from "@/hooks/use-toast";
import { sendVerificationEmail } from "@/lib/apis/auth";
import { IAccount } from "@/types/setting";
import { CheckCircle, Mail, XCircle } from "lucide-react";
import React, { useState } from "react";

const Account = ({ handleBack }: IAccount) => {
  const { user } = useUser();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const handleVerifyEmail = async () => {
    try {
      setIsVerifying(true);
      const data = await sendVerificationEmail();
      if (data?.success) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your inbox to verify your email.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send verification email. Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification email. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <div className="flex flex-col items-start w-full gap-5 h-full">
      <div className="px-4 flex items-center gap-3">
        <Back handleBack={handleBack} />
        <h1 className="text-2xl font-semibold">Account</h1>
      </div>
      <div className="flex flex-col items-start w-full border-y gap-3 p-4">
        <div className="flex items-center justify-start gap-2">
          <Mail size={20} />
          <p className="text-base">{user?.email}</p>
        </div>
        {user?.isEmailVerified ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <p className="text-sm">Email Verified</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-red-600">
              <XCircle size={20} />
              <p className="text-sm">Email Not Verified</p>
            </div>
            <Button
              disabled={isVerifying}
              onClick={handleVerifyEmail}
              className="!w-full !max-w-[115px] justify-center !mt-2"
            >
              {isVerifying ? <Spinner /> : "Verify Email"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Verifying your email allows you to connect with friends and start
              chatting.
            </p>
          </div>
        )}
      </div>
      {!user?.isEmailVerified && (
        <div className="px-4 py-4">
          <p className="text-sm">
            <strong>Why verify?</strong> Once your email is verified, you can
            connect with friends and start chatting. Verification enhances
            security and ensures a better experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default Account;
