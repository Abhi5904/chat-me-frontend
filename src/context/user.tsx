"use client";
import { AppConfig } from "@/config/appConfig";
import { toast } from "@/hooks/use-toast";
import { deleteCookie, getCookie, setCookie } from "@/lib/apis/cookies";
import { getUserByToken } from "@/lib/apis/user";
// SocketContext.tsx
import { IUser } from "@/types/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  isLoading: boolean;
  user: IUser | null;
  handleUpdateUser: (val: IUser | null) => void;
  isOpenVerifiedEmailModal: boolean;
  setIsOpenVerifiedEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook to use the User context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Create the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [isOpenVerifiedEmailModal, setIsOpenVerifiedEmailModal] =
    useState<boolean>(false);

  const handleUpdateUser = async (value: IUser | null) => {
    await setCookie(AppConfig.USER_STORAGE, JSON.stringify(value));
    setUser(value);
  };

  const fetchUserByToken = async () => {
    const data = await getUserByToken();
    if (data?.success) {
      return { data: data?.data, success: data?.success };
    }
    return {
      success: data?.success,
      title: data?.title,
      message: data?.message,
    };
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        let user;
        const cookieData = await getCookie(AppConfig.USER_STORAGE);
        const toaster = await getCookie(AppConfig.TOASTER);
        if (toaster) {
          if (toaster?.success) {
            toast({
              title: "Email Verified",
              description:
                toaster.message || "Your email has been successfully verified.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Verification Failed",
              description:
                toaster.message ||
                "Your email could not be verified. Please try again.",
            });
          }
          await deleteCookie(AppConfig.TOASTER);
          const data = await fetchUserByToken();
          if (data?.success) {
            user = data?.data;
          } else {
            toast({
              variant: "destructive",
              title: data?.title || "Error",
              description: data?.message || "Error from the backend side",
            });
            return;
          }
        } else if (cookieData) {
          user =
            typeof cookieData === "string"
              ? JSON.parse(cookieData)
              : cookieData;
        } else {
          const data = await fetchUserByToken();
          if (data?.success) {
            user = data?.data;
          } else {
            toast({
              variant: "destructive",
              title: data?.title || "Error",
              description: data?.message || "Error from the backend side",
            });
            return;
          }
        }
        await handleUpdateUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again later.",
        });
      } finally {
        setIsLoading(false); // Always stop loading
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      const emailVerified = await getCookie(AppConfig.IS_EMAIL_VERIFIED);
      if (user && !user?.isEmailVerified && !emailVerified) {
        setTimeout(() => {
          setIsOpenVerifiedEmailModal(true);
        }, 10000);
      }
    };

    verifyEmail();
  }, [user]);

  // console.log(user, "user");
  return (
    <UserContext.Provider
      value={{
        user,
        handleUpdateUser,
        isLoading,
        isOpenVerifiedEmailModal,
        setIsOpenVerifiedEmailModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
