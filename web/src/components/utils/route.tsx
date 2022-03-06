import { useLocation } from "react-router-dom";

const CurrentTab = () => {
  const path = useLocation().pathname;
  return {
    fullPath: path,
    rootRoute: "/" + path.split("/")[1],
    route: path.split("/")[2],
  };
};

export default CurrentTab;
