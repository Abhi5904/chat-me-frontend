import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IChatLayout {
  children: ReactNode;
}

export enum TabType {
  CHAT = "chat",
  SETTING = "setting",
  PROFILE = "profile",
  INVITATION = "invitation",
}

export interface IUserSidebar {
  tab: TabType;
  setTab: Dispatch<SetStateAction<TabType>>;
}

export interface IInviteFriendsModal {
  isOpenInviteFriendsModal: boolean;
  setIsOpenInviteFriendsModal: Dispatch<SetStateAction<boolean>>;
}

export interface ISelectedUser {
  receiverId: string;
  message: string;
}
