import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/error.action";

type Props = {
  type: string;
  text: string;
  classes?: string;
};

const PoppingNotification = ({ type, text, classes }: Props) => {
  const dispatch = useDispatch();

  const removeError = () => {
    dispatch(clearErrors());
  };

  if (!text) return null;
  return (
    <div
      className={`absolute top-2 right-2 flex items-center p-2 rounded-md bg-opacity-80 text-gray-900 ${classes} ${
        type === "error" ? "bg-red-400" : "bg-green-400"
      }`}
    >
      {type === "error" ? (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-gray-900"
        />
      ) : (
        <FontAwesomeIcon icon={faCheckCircle} className="text-gray-900" />
      )}
      <div className="ml-2">{text}</div>
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="ml-10 cursor-pointer"
        onClick={removeError}
      />
    </div>
  );
};

export default PoppingNotification;
