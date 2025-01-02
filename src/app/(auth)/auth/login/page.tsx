"use client";
import GoogleLogin from "@/components/auth/GoogleLogin";
import InputField from "@/components/common/InputField";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),

    password: Yup.string().required("Password is required"),
  });

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signupSchema,
      onSubmit: async () => {
        try {
          setIsSpinner(true);
          const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(values),
          });
          console.log(response, "response");
          if (!response?.ok) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Error from the backend side",
            });
            return;
          }

          const result = await response?.json();
          if (result?.status === "error") {
            toast({
              variant: "destructive",
              title: "Error",
              description: result?.message,
            });
            return;
          }
          router.push("/chat");
          toast({
            title: "Success",
            description: "Login successfully",
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
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
      },
    });

  return (
    <Card className="xl:max-w-[500px] w-full">
      <CardHeader className="gap-1">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Don’t have an account yet?{" "}
          <Link href={"/auth/sign-up"} className="underline">
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6">
        <form
          className="w-full flex flex-col items-center gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start w-full gap-5">
            <div className="flex flex-col gap-1 w-full">
              <InputField
                handleBlur={handleBlur}
                handleChange={handleChange}
                label="Email"
                name="email"
                placeholder="Enter email"
                type="email"
                value={values?.email}
                error={touched?.email && !!errors.email}
                errorMsg={errors?.email}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <InputField
                handleBlur={handleBlur}
                handleChange={handleChange}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                value={values?.password}
                error={touched?.password && !!errors.password}
                errorMsg={errors?.password}
              />
            </div>
          </div>
          <Button disabled={isSpinner} className="w-full">
            {isSpinner ? <Spinner /> : "Login"}
          </Button>
        </form>
        <div className="relative w-full border-b-2 h-1 my-6 z-[5]">
          <p className="absolute left-1/2 w-fit -translate-x-1/2 -top-1 z-10 text-xs bg-background px-5">
            Or login with
          </p>
        </div>
        <GoogleLogin />
      </CardContent>
    </Card>
  );
};

export default Login;
