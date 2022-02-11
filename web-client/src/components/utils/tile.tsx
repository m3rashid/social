import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrentTab from "../utils/route";
import { useSelector } from "react-redux";

type Props = {
  icon: any;
  text: string;
};

const InfoTile = ({ icon, text }: Props) => {
  const theme = useSelector((state: any) => state.ui.theme);

  const narrow = useSelector((state: any) => state.ui.narrow);
  const { rootRoute } = CurrentTab();
  const to = text.split(" ")[0].toLowerCase();
  return (
    <Link
      to={`${rootRoute}/${to}`}
      className={`py-2 ${
        theme.theme_bg
      } hover:bg-gray-600 rounded-md flex align-center cursor-pointer
    ${
      narrow
        ? "px-0 md:px-2 w-10 md:w-14 flex flex-row items-center justify-center"
        : "px-2 w-full flex-col md:flex-row justify-center md:justify-start"
    }`}
    >
      <div>
        <FontAwesomeIcon
          icon={icon}
          color="#6FCE42"
          className={`text-lg md:text-3xl`}
        />
      </div>
      {!narrow ? <p className="md:ml-3 self-center font-medium">{text}</p> : ""}
    </Link>
  );
};

export default InfoTile;
