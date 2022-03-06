import {FC} from "react";

const CreatedBy:FC = () => {
  return (
    <div className="text-xs text-white mt-4 text-center px-2">
      Created by{" "}
      <a
        style={{ color: "#6FCE42" }}
        href="https://m3rashid.netlify.app"
        target="_blank"
        rel="noreferrer noopener"
      >
        MD Rashid Hussain
      </a>
      <br /> Feel free to contact for queries or suggestions
    </div>
  );
};

export default CreatedBy;
