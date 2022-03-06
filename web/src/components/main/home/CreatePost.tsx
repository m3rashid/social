import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { UserType } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../redux/actions/post.action";
import { Link } from "react-router-dom";

const CreatePost = ({ user }: { user: UserType }) => {
  const theme = useSelector((state: any) => state.ui.theme);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const handleClick = (e: any) => {
      if (textAreaRef.current) {
        if (!textAreaRef.current.contains(e.target)) {
          textAreaRef.current.rows = 1;
        } else textAreaRef.current.rows = 5;
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [textAreaRef]);

  const showFile = (e: any) => {
    const gotImage = e.target.files[0];
    if (!gotImage) {
      setImage("");
      return;
    } else {
      setImage(URL.createObjectURL(gotImage));
      setFile(gotImage);
    }
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      window.alert("Please select an image");
      return;
    }
    if (!textAreaRef.current?.value) return;
    const data = {
      file: file,
      caption: textAreaRef.current.value,
    };
    dispatch(addPost(data));
  };

  return (
    <div className="flex flex-col">
      <div
        className={`${theme.theme} rounded-t-md flex flex-row items-center p-2`}
      >
        {user.avatar && (
          <img
            className="rounded-full h-10 w-10 mr-2"
            src={user.avatar}
            alt={user.name}
          />
        )}
        <Link to={`/user/${user.username}`}>
          <p className="font-medium">{user.name}</p>
          <p className="">@{user.username}</p>
        </Link>
      </div>
      <div className="flex bg-gray-500">
        <textarea
          ref={textAreaRef}
          placeholder="How are you feeling today"
          className="text-white bg-gray-500 p-2 rounded-b-md outline-none no-scrollbar w-full resize-none"
          name="caption"
          rows={1}
          required
        />
        <label htmlFor="file-upload" className="block cursor-pointer py-2 px-2">
          <FontAwesomeIcon icon={faImage} size="2x" />
          <input
            id="file-upload"
            type="file"
            name="image"
            className="hidden"
            onChange={showFile}
          />
        </label>
      </div>
      <div
        className={`flex items-center justify-center p-2 font-semibold cursor-pointer ${theme.theme} rounded-b-lg`}
        onClick={handleSubmit}
      >
        POST
      </div>
      {image && (
        <img
          className={`rounded-lg mt-2 ${theme.theme_bg}`}
          src={image}
          alt="post"
        />
      )}
    </div>
  );
};

export default CreatePost;
