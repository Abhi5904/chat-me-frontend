import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/context/user";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/common/Spinner";
import { getCookie, setCookie } from "@/lib/apis/cookies";
import { AppConfig } from "@/config/appConfig";
import { toast } from "@/hooks/use-toast";
import { sendVerificationEmail } from "@/lib/apis/auth";

const VerifyEmailModal = () => {
  const { isOpenVerifiedEmailModal, setIsOpenVerifiedEmailModal } = useUser();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const modalRef = useRef(false);

  const handleVerifyEmail = async () => {
    try {
      setIsSpinner(true);
      const data = await sendVerificationEmail();
      if (data?.success) {
        toast({
          variant: "default",
          title: data?.title,
          description: data?.message || "Mail send successfully",
        });
        setCookie(AppConfig.IS_EMAIL_VERIFIED, "true", 7 * 24 * 60 * 60);
        setIsOpenVerifiedEmailModal(false);
      } else {
        toast({
          variant: "destructive",
          title: data?.title || "Error",
          description:
            data?.message || "Error while sending verification email",
        });
        return;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message // If it's a standard JavaScript error
          : "An unexpected error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      console.log(error, "error while call api");
    } finally {
      setIsSpinner(false);
    }
  };

  useEffect(() => {
    if (!isOpenVerifiedEmailModal) {
      const handleModalClose = async () => {
        if (modalRef.current) {
          // Perform cookie logic when the modal is closed
          const emailVerified = await getCookie(AppConfig.IS_EMAIL_VERIFIED); // Check if the email is verified
          if (!emailVerified) {
            await setCookie(
              AppConfig.IS_EMAIL_VERIFIED,
              "false",
              7 * 24 * 60 * 60
            );
          }
        }
        setIsOpenVerifiedEmailModal(false); // Close the modal
      };
      handleModalClose();
    }
  }, [isOpenVerifiedEmailModal, setIsOpenVerifiedEmailModal]);
  return (
    <Dialog
      open={isOpenVerifiedEmailModal}
      onOpenChange={(open) => {
        // Set modalRef to true when the modal is closed by the user
        if (!open) modalRef.current = true;
        setIsOpenVerifiedEmailModal(open);
      }}
    >
      <DialogContent className="sm:max-w-md md:max-w-xl gap-10">
        <DialogHeader>
          <DialogTitle>Verify Your Email Address</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">
          To complete your registration, we need to verify your email address.
          Please click the &quot;Confirm Email&quot; button to receive a
          verification email.
        </p>
        <DialogFooter className="sm:justify-end w-full">
          <Button
            disabled={isSpinner}
            type="button"
            onClick={handleVerifyEmail}
            className="text-center !max-w-[132px] justify-center !w-full"
          >
            {isSpinner ? <Spinner /> : "Confirm Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailModal;
