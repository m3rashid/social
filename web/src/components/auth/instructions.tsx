import { FC, useState } from "react";
import Heading from "./heading";
import Navigate from "./navigate";
import CreatedBy from "./createdBy";
import { useSelector } from "react-redux";

const Page1: FC = () => {
  const theme = useSelector((state: any) => state.ui.theme);
  return (
    <>
      <Heading text="General Guidelines" />
      <div className="my-4 text-white">
        <div className={`${theme.theme} text-sm`}>
          <ul className="list-disc pr-2 pl-4">
            <li>Dont be a jerk. Be respectful</li>
            <li>No affiliate, malicious links or advertising allowed here</li>
            <li>Respect others' opinion</li>
            <li>Do not try to impersonate someone</li>
            <li>
              If anything is found violating the said conditions, it would be
              immediately removed
            </li>
            <li>
              These rules are subject to change depending on the community and
              the scenarios
            </li>
          </ul>
          <h4 className="text-center mt-4 text-sm text-red-600">
            Failing on the above terms may lead to temporary or permanent ban
            from Social
          </h4>
        </div>
      </div>
    </>
  );
};

const Page2 = () => {
  // const theme = useSelector((state: any) => state.ui.theme);
  return (
    <>
      <Heading text="Guidelines for Posts" />
      <div className="my-4 text-white">
        <h3>Posts must not contain ---</h3>
        <ul className="list-disc text-sm pr-2 pl-4">
          <li>Pornography, nudity, racism, sexism, swearing, hate speech</li>
          <li>Any personal (undisclosable) material</li>
          <li>
            Memes, jokes or any other unproductive stuff. These to be discussed
            under the global chat section only
          </li>
          <li>Religious content</li>
        </ul>
        <h4 className="text-center mt-4 text-sm text-red-600">
          Posts not complying with the given guidelines would be removed and
          further action may be taken against the sender
        </h4>
      </div>
    </>
  );
};

const Instructions = () => {
  const theme = useSelector((state: any) => state.ui.theme);
  const [firstPage, setFirstPage] = useState(true);
  return (
    <div className={`${theme.theme} rounded-lg max-w-md px-2 py-6`}>
      {firstPage ? <Page1 /> : <Page2 />}
      <div
        className={`mb-4 flex transition-all ${
          firstPage ? "justify-end" : "justify-start"
        }`}
      >
        <button
          style={{ backgroundColor: "#6FCE42" }}
          className="rounded-lg font-medium text-gray-900 px-3 py-1"
          onClick={() => setFirstPage(!firstPage)}
        >
          {firstPage ? "Next >>" : "<< Previous"}
        </button>
      </div>
      <Navigate
        lRoute="/login"
        lText="Login Here"
        rRoute="/signup"
        rText="Signup Here"
      />
      <CreatedBy />
    </div>
  );
};

export default Instructions;
