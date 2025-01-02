import { AuthLayout } from "@/components/layouts/AuthLayout";
import { AppConfig } from "@/config/appConfig";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const AuthMainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthLayout>
      <GoogleOAuthProvider clientId={AppConfig.GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </AuthLayout>
  );
};

export default AuthMainLayout;
