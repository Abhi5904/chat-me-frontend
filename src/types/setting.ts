import { Dispatch, SetStateAction } from "react";

export enum SettingTabType {
  ALLSETTING = "all-setting",
  ACCOUNT = "account",
}

export interface ISetting {
  setSettingTab: Dispatch<SetStateAction<SettingTabType>>;
}

export interface IAccount {
  handleBack: () => void;
}
