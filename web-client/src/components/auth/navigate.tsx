import { Link } from "react-router-dom";

type Props = {
  lRoute: string;
  lText: string;
  rRoute: string;
  rText: string;
};

const Navigate = ({ lRoute, lText, rRoute, rText }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <Link
        to={lRoute}
        style={{ color: "#6FCE42" }}
        className="font-semibold pl-3"
      >
        {lText}
      </Link>
      <Link
        to={rRoute}
        style={{ color: "#6FCE42" }}
        className="font-semibold pr-3"
      >
        {rText}
      </Link>
    </div>
  );
};

export default Navigate;
