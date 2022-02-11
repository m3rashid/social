import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

type InputProps = {
  name?: string;
  value?: string;
  type: string;
  icon: any;
  placeholder: string;
  onChange?: (e: any) => void;
};

const Input = ({
  icon,
  name,
  type,
  placeholder,
  onChange,
  value,
}: InputProps) => {
  const [visible, setVisible] = useState(false);
  const [currentType, setCurrentType] = useState(type);
  const theme = useSelector((state: any) => state.ui.theme);

  const show_hide = () => {
    if (!visible) {
      setCurrentType("text");
      setVisible(true);
    } else {
      setVisible(false);
      setCurrentType("password");
    }
  };

  return (
    <div className="py-2 px-3 flex flex-col w-full">
      <div
        className={`${theme.theme_bg} rounded-md px-3 py-1.5 flex flex-row items-center justify-center gap-3`}
      >
        <FontAwesomeIcon size="2x" icon={icon} style={{ color: "#6FCE42" }} />
        <input
          className={`focus:outline-none ${theme.theme_bg} rounded-md px-3 text-md text-white w-full`}
          type={currentType}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
        {type === "password" &&
          (visible ? (
            <FontAwesomeIcon size="lg" icon={faEye} onClick={show_hide} />
          ) : (
            <FontAwesomeIcon size="lg" icon={faEyeSlash} onClick={show_hide} />
          ))}
      </div>
    </div>
  );
};

export default Input;
