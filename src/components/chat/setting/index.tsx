import { SettingTabType } from "@/types/setting";
import React, { useState } from "react";
import Setting from "./Setting";
import Account from "./Account";

const AllSettings = () => {
  const [settingTab, setSettingTab] = useState<SettingTabType>(
    SettingTabType.ALLSETTING
  );
  const handleBack = () => {
    setSettingTab(SettingTabType.ALLSETTING);
  };
  return (
    <div className="relative max-w-[400px] w-full min-w-[300px] py-5 border-r h-full">
      {settingTab === SettingTabType.ALLSETTING && (
        <Setting setSettingTab={setSettingTab} />
      )}
      {settingTab === SettingTabType.ACCOUNT && (
        <Account handleBack={handleBack} />
      )}
    </div>
  );
};

export default AllSettings;
