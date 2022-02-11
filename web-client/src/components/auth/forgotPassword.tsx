import { FC, useState } from "react";
import Input from "../utils/input";
import SubmitButton from "../utils/submit";
import { faUser, faAt } from "@fortawesome/free-solid-svg-icons";
import Navigate from "./navigate";
import Heading from "./heading";
import CreatedBy from "./createdBy";
import { forgotPassword } from "../../redux/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword: FC = () => {
  const theme = useSelector((state: any) => state.ui.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotData, setForgotData] = useState({
    username: "",
    email: "",
  });

  const handleForgotPassword = () => {
    window.localStorage.setItem(
      "social_forgot_data",
      JSON.stringify(forgotData)
    );
    dispatch(forgotPassword(forgotData));
    // navigate to reset-password
    navigate("/reset-password", { replace: true });
  };
  return (
    <div className={`${theme.theme} rounded-lg max-w-md px-2 py-6`}>
      <Heading text="Forgot Password" />
      <div className="my-4">
        <Input
          icon={faAt}
          type="text"
          value={forgotData.email}
          onChange={(e) =>
            setForgotData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Enter your email"
        />
        <Input
          icon={faUser}
          type="text"
          value={forgotData.username}
          onChange={(e) =>
            setForgotData((prev) => ({ ...prev, username: e.target.value }))
          }
          placeholder="Enter your username"
        />
        <SubmitButton label="Find Me" onClick={handleForgotPassword} />
      </div>
      <Navigate
        lRoute="/login"
        lText="Login Instead"
        rRoute="/signup"
        rText="Signup Instead"
      />
      <CreatedBy />
    </div>
  );
};

export default ForgotPassword;
