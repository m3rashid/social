import InfoTile from "../../utils/tile";
import { faUserEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const ProfileSidebar = () => {
  const username = useSelector((state: any) => state.auth.user.username);
  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <InfoTile icon={faUser} text={username} />
      {/* enter the username in the me section */}
      <InfoTile icon={faUserEdit} text="Edit Profile" />
    </div>
  );
};

export default ProfileSidebar;
