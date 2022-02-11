import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrentTab from "./route";
import { useSelector } from "react-redux";

type Props = {
  to: string;
  icon: any;
};

const HeaderIcon = ({ to, icon }: Props) => {
  const theme = useSelector((state: any) => state.ui.theme);

  const rootRoute = to.split("/")[1];
  return (
    <Link to={to}>
      <div
        className={`flex items-center justify-center hover:${
          theme.theme_bg
        } py-1 px-2 mx-2 rounded-md ${
          CurrentTab().rootRoute === "/" + rootRoute ? theme.theme_bg : ""
        }`}
      >
        <FontAwesomeIcon icon={icon} size="2x" color="#6FCE42" />
        <p className="hidden xl:block ml-2 text-xl capitalize">{rootRoute}</p>
      </div>
    </Link>
  );
};

export default HeaderIcon;
