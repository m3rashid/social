import InfoTile from "../../utils/tile";
import {
  faHandsHelping,
  faUserSecret,
  faShieldAlt,
  faUserCog,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const SettingsSidebar = () => {
  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <InfoTile icon={faCog} text="All Settings" />
      <InfoTile icon={faUserCog} text="User Settings" />
      <InfoTile icon={faHandsHelping} text="Help" />
      <InfoTile icon={faUserSecret} text="Privacy" />
      <InfoTile icon={faShieldAlt} text="Security" />
    </div>
  );
};

export default SettingsSidebar;
