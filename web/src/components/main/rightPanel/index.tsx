import HomeRightBar from "./home";
import ChatRightBar from "./chat";
import ProfileRightBar from "./profile";
import SettingsRightBar from "./settings";
import CurrentTab from "../../utils/route";
import { useSelector } from "react-redux";

type RightPanelProps = {
  narrow: boolean;
  toggle?: () => void;
};

const RightPanel = ({ narrow, toggle }: RightPanelProps) => {
  const theme = useSelector((state: any) => state.ui.theme);

  return (
    <div
      className={`md:block md:w-64 lg:w-96 flex flex-col items-center text-center ${theme.theme} rounded-r-lg p-3 absolute right-0 top-0 z-10`}
      style={{ height: "calc(100vh - 65px)" }}
    >
      <div className={`${narrow ? "mt-8" : "mt-16"} w-full overflow-y-auto`}>
        {CurrentTab().rootRoute === "/home" ? (
          <HomeRightBar narrow={narrow} />
        ) : null}
        {CurrentTab().rootRoute === "/chat" ? (
          <ChatRightBar narrow={narrow} />
        ) : null}
        {CurrentTab().rootRoute === "/me" ? (
          <ProfileRightBar narrow={narrow} />
        ) : null}
        {CurrentTab().rootRoute === "/settings" ? (
          <SettingsRightBar narrow={narrow} />
        ) : null}
      </div>
    </div>
  );
};

export default RightPanel;
