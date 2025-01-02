/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pen } from "lucide-react";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import InputField from "@/components/common/InputField";
import { useFormik } from "formik";
import { useUser } from "@/context/user";
import TextAreaField from "@/components/common/TextArea";
import { getUser, updateUser } from "@/lib/apis/user";
import Spinner from "@/components/common/Spinner";
import { toast } from "@/hooks/use-toast";

const EditProfileModal = () => {
  const { user, handleUpdateUser } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        bio: user?.bio ?? "",
      },
      enableReinitialize: true,
      validationSchema: Yup.object({
        firstName: Yup.string()
          .required("First name is required")
          .default(user?.firstName),
        lastName: Yup.string().optional().default(user?.lastName),
        bio: Yup.string().optional().default(user?.bio),
      }),
      onSubmit: async () => {
        try {
          setIsSpinner(true);
          const data = await updateUser(user?._id || "", values);
          if (data?.success) {
            const userdata = await getUser(user?._id || "");
            if (userdata?.success) {
              handleUpdateUser(userdata?.data);
            }
            setIsOpen(false);
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
          console.log(error, "error");
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
      },
    });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Pen size={18} color="currentColor" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-xl gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="flex items-center flex-col w-full gap-5">
            <InputField
              handleBlur={handleBlur}
              handleChange={handleChange}
              label="First name"
              name="firstName"
              placeholder="First Name"
              type="text"
              value={values?.firstName}
              error={!!errors?.firstName && touched?.firstName}
              errorMsg={errors?.firstName}
            />
            <InputField
              handleBlur={handleBlur}
              handleChange={handleChange}
              label="Last name"
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={values?.lastName}
              isrequired={false}
            />
            <TextAreaField
              handleBlur={handleBlur}
              handleChange={handleChange}
              label="Bio"
              name="bio"
              placeholder="Bio"
              value={values?.bio}
              isrequired={false}
              textAreaClassname="min-h-[160px]"
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              disabled={isSpinner}
              type="submit"
              className="max-w-[85px] w-full text-center"
            >
              {isSpinner ? <Spinner /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
