import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateName,
  updateAvatar,
  updateBio,
  updateWebsite,
  updateDob,
} from "../../../redux/actions/auth.action";

const EditProfile = () => {
  const theme = useSelector((state: any) => state.ui.theme);

  const currentUser = useSelector((state: any) => state.auth.user);
  const [name, setName] = useState<string>(currentUser.name);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [image, setImage] = useState<string>(currentUser.avatar);
  const [bio, setBio] = useState<string>(currentUser.bio || "");
  const [website, setWebsite] = useState<string>(currentUser.websiteUrl);
  const [dob, setDob] = useState<any>(currentUser.dob);

  const showFile = (e: any) => {
    const gotImage = e.target.files[0];
    if (!gotImage) {
      setAvatar(null);
      return;
    } else {
      setImage(URL.createObjectURL(gotImage));
      setAvatar(gotImage);
    }
  };

  const dispatch = useDispatch();
  const handleNameUpdate = () => {
    if (!name) return;
    dispatch(updateName(name));
  };

  const handleAvatarUpdate = () => {
    if (!avatar) return;
    dispatch(updateAvatar(avatar));
  };

  const handleBioUpdate = () => {
    if (!bio) return;
    dispatch(updateBio(bio));
  };

  const handleWebsiteUpdate = () => {
    if (!website) return;
    dispatch(updateWebsite(website));
  };

  const handleDobUpdate = () => {
    if (!dob) return;
    dispatch(updateDob(dob));
  };

  return (
    <>
      <div className={`${theme.theme} rounded-lg p-2 mb-2 flex flex-col`}>
        <input
          className={`my-2 mx-3 focus:outline-none ${theme.theme_bg} rounded-md px-3 text-md text-white py-2`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="my-2 mx-3 rounded-lg text-gray-900 ml-3 px-3 py-1 font-bold"
          style={{ backgroundColor: "#6FCE42" }}
          onClick={handleNameUpdate}
        >
          Update Name
        </button>
      </div>
      {image && (
        <>
          <p className="my-2 font-semibold">Current Avatar</p>
          <img
            className={`rounded-lg ${theme.theme_bg}`}
            src={image}
            alt="avatar"
          />
        </>
      )}

      <div
        className={`${theme.theme} rounded-lg p-2 my-2 flex flex-row items-center justify-between`}
      >
        <label
          htmlFor="avatar-upload"
          className="my-2 mx-3 cursor-pointer py-2"
        >
          <FontAwesomeIcon icon={faImage} size="2x" />
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            onChange={showFile}
          />
        </label>
        <button
          className="my-2 mx-3 rounded-lg text-gray-900 px-3 py-1 font-bold"
          style={{ backgroundColor: "#6FCE42" }}
          onClick={handleAvatarUpdate}
        >
          Update Avatar
        </button>
      </div>

      <div className={`${theme.theme} rounded-lg p-2 mb-2 flex flex-col`}>
        <input
          className={`my-2 mx-3 focus:outline-none ${theme.theme_bg} rounded-md px-3 text-md text-white py-2`}
          type="text"
          value={website}
          placeholder={!currentUser.websiteUrl ? "Add your website Url" : ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button
          className="my-2 mx-3 rounded-lg text-gray-900 ml-3 px-3 py-1 font-bold"
          style={{ backgroundColor: "#6FCE42" }}
          onClick={handleWebsiteUpdate}
        >
          {!currentUser.websiteUrl ? "Add your Website" : "Update Website"}
        </button>
      </div>

      <div className={`${theme.theme} rounded-lg p-2 mb-2 flex flex-col`}>
        <input
          className={`my-2 mx-3 focus:outline-none ${theme.theme_bg} rounded-md px-3 text-md text-white py-2`}
          type="text"
          value={bio}
          placeholder={!currentUser.bio ? "Add a bio" : ""}
          onChange={(e) => setBio(e.target.value)}
        />
        <button
          className="my-2 mx-3 rounded-lg text-gray-900 ml-3 px-3 py-1 font-bold"
          style={{ backgroundColor: "#6FCE42" }}
          onClick={handleBioUpdate}
        >
          {!currentUser.bio ? "Add a Bio" : "Update Bio"}
        </button>
      </div>

      <div className={`${theme.theme} rounded-lg p-2 mb-2 flex flex-col`}>
        <input
          className={`my-2 mx-3 focus:outline-none ${theme.theme_bg} rounded-md px-3 text-md text-white py-2`}
          type="date"
          value={dob}
          placeholder={!currentUser.dob ? "Add Date of Birth" : ""}
          onChange={(e) => setDob(e.target.value)}
        />
        <button
          className="my-2 mx-3 rounded-lg text-gray-900 ml-3 px-3 py-1 font-bold"
          style={{ backgroundColor: "#6FCE42" }}
          onClick={handleDobUpdate}
        >
          {!currentUser.dob ? "Add Date of Birth" : "Update Date of Birth"}
        </button>
      </div>
    </>
  );
};

export default EditProfile;
