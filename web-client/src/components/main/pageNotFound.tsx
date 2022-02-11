import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// this page is unused
const PageNotFound = () => {
  const theme = useSelector((state: any) => state.ui.theme);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <h1 className="text-3xl text-white">Page not found</h1>
      <Link
        to="/"
        className={`text-xl py-2 px-3 hover:${theme.theme} rounded-md`}
        style={{ color: "#6FCE42" }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
