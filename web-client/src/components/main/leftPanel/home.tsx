import InfoTile from "../../utils/tile";
import {
  faUsers,
  faSave,
  // faCalendarWeek,
  // faAddressCard,
  faTable,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const HomeSidebar = () => {
  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <InfoTile icon={faHome} text="Feed" />
      <InfoTile icon={faUsers} text="Friends" />
      <InfoTile icon={faSave} text="Saved Posts" />
      {/* <InfoTile icon={faCalendarWeek} text="Events Today" /> */}
      <InfoTile icon={faTable} text="Instructions" />
      {/* <InfoTile icon={faAddressCard} text="About us" /> */}
    </div>
  );
};

export default HomeSidebar;
