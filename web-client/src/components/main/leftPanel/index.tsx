import HomeSidebar from "./home";
import ChatSidebar from "./chat";
import ProfileSidebar from "./profile";
import SettingsSidebar from "./settings";
import Notifications from "./notifications";
import CurrentTab from "../../utils/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

type LeftPanelProps = {
  toggle?: () => void;
};

const LeftPanel = ({ toggle }: LeftPanelProps) => {
  const narrow = useSelector((state: any) => state.ui.narrow);
  const theme = useSelector((state: any) => state.ui.theme);
  return (
    <div
      className={`flex flex-col items-center text-center ${
        theme.theme
      } rounded-l-lg py-3 absolute left-0 top-0 z-10 
      ${narrow ? "px-1 w-14 md:w-20" : "px-2 w-32 md:w-52"}
      `}
      style={{ height: "calc(100vh - 65px)" }}
    >
      <div
        className={`py-2 ${
          theme.theme
        } rounded-md flex flex-row align-center hover:${
          theme.theme_bg
        } transition-all w-full 
      ${narrow ? "justify-center px-1" : "justify-end px-2"}`}
        onClick={toggle}
      >
        <FontAwesomeIcon icon={faBars} size="2x" color="#6FCE42" />
      </div>
      <div className={`${narrow ? "mt-8" : "mt-16"} w-full overflow-y-auto`}>
        {CurrentTab().rootRoute === "/home" && <HomeSidebar />}
        {CurrentTab().rootRoute === "/chat" && <ChatSidebar />}
        {CurrentTab().rootRoute === "/user" && <ProfileSidebar />}
        {CurrentTab().rootRoute === "/settings" && <SettingsSidebar />}
        {CurrentTab().rootRoute === "/notifications" && <Notifications />}
      </div>
    </div>
  );
};

export default LeftPanel;
