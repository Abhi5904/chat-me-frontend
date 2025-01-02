"use client";
import { getConversationByToken } from "@/lib/apis/conversation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./user";
import { toast } from "@/hooks/use-toast";

interface IChatContext {
  conversations: string[];
  isConversationLoading: boolean;
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

export const useChat = (): IChatContext => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export default function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [isConversationLoading, setIsConversationLoading] =
    useState<boolean>(true);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      if (!user?._id) return; // Prevent fetching if user ID is not available

      setIsConversationLoading(true);
      try {
        const data = await getConversationByToken(user._id);
        if (data?.success) {
          setConversations(data?.data || []);
        } else {
          toast({
            variant: "destructive",
            title: data?.title || "Error",
            description:
              data?.message || "Error while fetching conversation data",
          });
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong while fetching conversations.",
        });
      } finally {
        setIsConversationLoading(false); // Stop loading state regardless of outcome
      }
    };
    getConversations();
  }, [user]);

  return (
    <ChatContext.Provider value={{ conversations, isConversationLoading }}>
      {children}
    </ChatContext.Provider>
  );
}
