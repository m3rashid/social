import InfoTile from "../../utils/tile";
import { faUser, faGlobe } from "@fortawesome/free-solid-svg-icons";

const ChatSidebar = () => {
  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <InfoTile icon={faGlobe} text="Global" />
      <InfoTile icon={faUser} text="Username" />
      <InfoTile icon={faUser} text="Username" />
      <InfoTile icon={faUser} text="Username" />
      <InfoTile icon={faUser} text="Username" />
      <InfoTile icon={faUser} text="Username" />
    </div>
  );
};

export default ChatSidebar;
