import { FC, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faComments,
  faUser,
  faSearch,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "../utils/headerNav";
import { useSelector } from "react-redux";

const Header: FC = () => {
  const theme = useSelector((state: any) => state.ui.theme);
  const query = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:gap-4 ${theme.theme} text-white mb-1 rounded-b-lg`}
    >
      <div className="flex flex-2 flex-row items-center justify-between md:justify-around px-2">
        <div className="px-2">
          <img src="/images/favicon.png" alt="" className="h-14" />
        </div>
        <form action="" method="" onSubmit={handleSubmit}>
          <div
            className={`flex flex-row items-center justify-center rounded-full ${theme.theme_bg} pl-2 hover:bg-gray-500 focus:bg-gray-500`}
          >
            <FontAwesomeIcon icon={faSearch} className="" />
            <input
              className="w-full rounded-full pl-2 py-1 outline-none bg-transparent text-lg"
              type="text"
              name="search-query"
              ref={query}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-1 flex-row items-center justify-between md:justify-around p-2">
        <HeaderIcon icon={faHome} to="/home/feed" />
        <HeaderIcon icon={faComments} to="/chat/global" />
        <HeaderIcon icon={faUser} to="/user/edit" />
        <HeaderIcon icon={faBell} to="/notifications/all" />
        <HeaderIcon icon={faCog} to="/settings/all" />
      </div>
    </div>
  );
};

export default Header;
