import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

type NotifProps = {
  type: string;
  notifTitle: string;
  notifMsg: string;
  imgSrc?: string;
};

const Notification = ({ type, notifTitle, notifMsg, imgSrc }: NotifProps) => {
  const theme = useSelector((state: any) => state.ui.theme);

  const getIcon = () => {
    let message = { icon: faBug, bgcolor: "", color: "" };

    switch (type) {
      case "success":
        message = {
          icon: faCheckCircle,
          bgcolor: "bg-green-400",
          color: "text-gray-900",
        };
        break;
      case "failure":
        message = {
          icon: faBug,
          bgcolor: "bg-red-400",
          color: "text-gray-900",
        };
        break;
      default:
        message = {
          icon: faInfoCircle,
          bgcolor: theme.theme,
          color: "text-gray-100",
        };
        break;
    }
    return message;
  };

  return (
    <div className={`flex p-2 rounded-md bg-opacity-80 ${getIcon().bgcolor}`}>
      {imgSrc ? (
        <img src={imgSrc} alt="" className="h-10" />
      ) : (
        <FontAwesomeIcon icon={getIcon().icon} className={getIcon().color} />
      )}
      <div className="ml-2">
        <p className={`font-medium ${getIcon().color}`}>{notifTitle}</p>
        <p className={` text-sm ${getIcon().color}`}>{notifMsg}</p>
      </div>
    </div>
  );
};

export default Notification;
