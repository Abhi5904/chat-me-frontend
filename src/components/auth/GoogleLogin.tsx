import type { TokenResponse } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Google from "@/assets/Google";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

const GoogleLogin = () => {
  const router = useRouter();

  const googleLoginSuccess = async (
    tokenResponse: Omit<
      TokenResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    try {
      const token = tokenResponse.access_token;
      if (token) {
        const response = await fetch("/api/auth/google-login", {
          method: "POST",
          body: JSON.stringify({ token }),
        });
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
          description: result?.message,
        });
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
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleLoginSuccess,
  });

  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={() => googleLogin()}
    >
      <Google size={16} />
      Continue with google
    </Button>
  );
};

export default GoogleLogin;
