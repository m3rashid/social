import CustomContainer from "../../utils/customContainer";
import Post from "../home/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { darkMode, lightMode } from "../../../redux/actions/ui.action";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const posts = useSelector((state: any) => state.post.userPosts);
  const user = useSelector((state: any) => state.auth.user);
  const theme = useSelector((state: any) => state.ui.theme);

  const themeToShow = theme.name === "dark" ? "light" : "dark";
  const handleThemeChange = () => {
    if (theme.name === "dark") {
      dispatch(lightMode());
    } else if (theme.name === "light") {
      dispatch(darkMode());
    }
  };

  return (
    <>
      <div
        className="cursor-pointer flex justify-end items-center"
        style={{ color: "#6FCE42" }}
        onClick={handleLogout}
      >
        <FontAwesomeIcon className="text-lg md:text-3xl" icon={faSignOutAlt} />
        &nbsp; Logout
      </div>

      <div
        className="cursor-pointer flex justify-end items-center"
        style={{ color: "#6FCE42" }}
        onClick={handleThemeChange}
      >
        <FontAwesomeIcon className="text-lg md:text-3xl" icon={faUserCog} />
        &nbsp; Change to {themeToShow} theme
      </div>

      <div className="">
        <div
          className={`${theme.theme} flex gap-4 p-2 rounded-md mt-2 mb-2 items-center`}
        >
          {user.avatar && (
            <img className="rounded-full h-14 w-14" src={user.avatar} alt="" />
          )}
          <div className="">
            <h1 className="">{user.name}</h1>
            <p className="text-gray-300">@{user.username}</p>
            <p>{user.bio}</p>
          </div>
        </div>
        <CustomContainer>
          {posts.map((post: any) => {
            return <Post post={post} />;
          })}
        </CustomContainer>
      </div>
    </>
  );
};

export default Profile;
