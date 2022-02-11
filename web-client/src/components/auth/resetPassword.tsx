import { FC, useState } from "react";
import Input from "../utils/input";
import SubmitButton from "../utils/submit";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Navigate from "./navigate";
import Heading from "./heading";
import CreatedBy from "./createdBy";
import { resetPassword } from "../../redux/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword: FC = () => {
  const theme = useSelector((state: any) => state.ui.theme);

  const dispatch = useDispatch();

  const dataGot = window.localStorage.getItem("social_forgot_data");
  const forgotData = JSON.parse(dataGot as string);
  const [resetData, setResetData] = useState({
    username: forgotData.username,
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleResetPassword = () => {
    dispatch(resetPassword({ ...resetData, otp: parseInt(resetData.otp) }));
  };

  return (
    <div className={`${theme.theme} rounded-lg max-w-md px-2 py-6`}>
      <Heading text="Reset Password" />
      <div className="my-4">
        <Input
          icon={faUser}
          type="text"
          value={resetData.username}
          onChange={(e) =>
            setResetData((prev) => ({ ...prev, username: e.target.value }))
          }
          placeholder="Enter your username"
        />
        <Input
          icon={faKey}
          value={resetData.password}
          onChange={(e) =>
            setResetData((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          placeholder="Choose a strong password"
        />
        <Input
          icon={faKey}
          type="password"
          value={resetData.confirmPassword}
          onChange={(e) =>
            setResetData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          placeholder="Confirm password"
        />
        <SubmitButton label="Reset Password" onClick={handleResetPassword} />
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

export default ResetPassword;
