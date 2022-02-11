import { FC, useState } from "react";
import Input from "../utils/input";
import SubmitButton from "../utils/submit";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Navigate from "./navigate";
import Heading from "./heading";
import CreatedBy from "./createdBy";
import { useNavigate } from "react-router-dom";
import PoppingNotification from "./poppingNotification";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";

const Login: FC = () => {
  const theme = useSelector((state: any) => state.ui.theme);

  const status = useSelector((state: any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleLoginUser = () => {
    dispatch(login(loginData));
  };

  if (status) {
    navigate("/", { replace: true });
  }

  const error = useSelector((state: any) => state.error.msg);
  return (
    <>
      <PoppingNotification type="error" text={error} />
      <div className={`${theme.theme} rounded-lg max-w-md px-2 py-6`}>
        <Heading text="Login to Social" />
        <div className="my-4">
          <Input
            icon={faUser}
            type="text"
            value={loginData.username}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="Enter your username"
          />
          <Input
            icon={faKey}
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter your password"
          />
          <SubmitButton label="Login" onClick={handleLoginUser} />
        </div>
        <Navigate
          lRoute="/signup"
          lText="Signup Instead"
          rRoute="/forgot-password"
          rText="Forgot Password ?"
        />
        <CreatedBy />
      </div>
    </>
  );
};

export default Login;
