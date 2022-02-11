import { Link } from "react-router-dom";
import CurrentTab from "../utils/route";

type Props = {
  text: string;
};

const Heading = ({ text }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between px-3">
      <div className="flex flex-row items-center gap-2">
        <img src="/images/favicon.png" alt="social logo" className="h-10" />
        <h1 className="text-xl text-white font-bold">{text}</h1>
      </div>
      {CurrentTab().rootRoute !== "/guidelines" ? (
        <Link to="/guidelines">
          <p style={{ color: "#6FCE42" }} className="font-semibold">
            Guidelines
          </p>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Heading;
