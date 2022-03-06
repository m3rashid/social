import { useState, useEffect } from "react";
import Input from "../utils/input";
import SubmitButton from "../utils/submit";
import {
  faUser,
  faKey,
  faAt,
  faChessKing,
} from "@fortawesome/free-solid-svg-icons";
import Navigate from "./navigate";
import Heading from "./heading";
import CreatedBy from "./createdBy";

import PoppingNotification from "./poppingNotification";
import { useSelector, useDispatch } from "react-redux";
import { registerOne, registerTwo } from "../../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const dispatch = useDispatch();
  const [page1Data, setPage1Data] = useState<{
    username: string;
    email: string;
  }>({
    username: "",
    email: "",
  });

  const handleRegisterOne = () => {
    dispatch(registerOne(page1Data));
  };

  return (
    <>
      <div className="text-xs text-white mt-4 mb-2 text-center px-2">
        Signup to Social requires a valid email address
        <br />
        Once your email is verified, you can proceed further
      </div>
      <Input
        value={page1Data.username}
        onChange={(e) =>
          setPage1Data((prev) => ({ ...prev, username: e.target.value }))
        }
        icon={faUser}
        type="text"
        placeholder="Enter a desired username"
      />
      <Input
        value={page1Data.email}
        onChange={(e) =>
          setPage1Data((prev) => ({ ...prev, email: e.target.value }))
        }
        icon={faAt}
        type="email"
        placeholder="Enter your valid email address"
      />
      <SubmitButton label="Get OTP" onClick={handleRegisterOne} />
    </>
  );
};

const Page2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page1Data: any = useSelector((store: any) => store.auth.registerOne);
  const status: boolean = useSelector(
    (store: any) => store.auth.isAuthenticated
  );

  const [data, setData] = useState({
    username: page1Data.username,
    email: page1Data.email,
    name: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState<string[] | never>([]);

  const hanldeChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterTwo = () => {
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      setErrors(["Passwords do not match"]);
    } else {
      dispatch(registerTwo({ ...data, otp: parseInt(data.otp) }));
    }
  };
  if (status) {
    navigate("/", { replace: true });
  }

  return (
    <>
      {errors &&
        errors.map((error, index) => (
          <PoppingNotification key={index} type="error" text={error} />
        ))}
      <Input
        value={data.username}
        onChange={hanldeChange}
        name="username"
        icon={faUser}
        type="text"
        placeholder="Enter your username"
      />
      <Input
        value={data.email}
        onChange={hanldeChange}
        name="email"
        icon={faAt}
        type="text"
        placeholder="Enter your email"
      />
      <Input
        value={data.name}
        onChange={hanldeChange}
        name="name"
        icon={faChessKing}
        type="text"
        placeholder="Enter your full name"
      />
      <Input
        value={data.password}
        onChange={hanldeChange}
        name="password"
        icon={faKey}
        type="password"
        placeholder="Enter a strong password"
      />
      <Input
        value={data.confirmPassword}
        onChange={hanldeChange}
        name="confirmPassword"
        icon={faKey}
        type="password"
        placeholder="Confirm password"
      />
      <Input
        value={data.otp.toString()}
        onChange={hanldeChange}
        name="otp"
        icon={faKey}
        type="text"
        placeholder="Enter your OTP"
      />
      <SubmitButton label="Signup" onClick={handleRegisterTwo} />
    </>
  );
};

const Signup = () => {
  const [firstPage, setFirstPage] = useState(true);
  const error = useSelector((state: any) => state.error.msg);
  const theme = useSelector((state: any) => state.ui.theme);

  let successMessage: string = "";
  const status: any = useSelector(
    (state: any) => state.auth.registerOne.success
  );

  if (status) {
    successMessage = "OTP sent to your email";
  }

  useEffect(() => {
    if (status) {
      setFirstPage(false);
    }
  }, [status]);

  return (
    <div className={`${theme.theme} rounded-lg max-w-md px-2 py-6`}>
      <Heading text="Signup to Social" />
      <div className="my-4">
        <PoppingNotification type="error" text={error} />
        <PoppingNotification type="success" text={successMessage} />
        <div className="mb-2">{firstPage ? <Page1 /> : <Page2 />}</div>
      </div>
      <Navigate
        lRoute="/login"
        lText="Login Instead"
        rRoute="/forgot-password"
        rText="Forgot Password ?"
      />
      <CreatedBy />
    </div>
  );
};

export default Signup;
