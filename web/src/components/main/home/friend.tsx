import { useSelector } from "react-redux";

type Props = {
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  id?: string;
};

const Friend = ({ username, name, avatar, bio }: Props) => {
  const theme = useSelector((state: any) => state.ui.theme);

  return (
    <div className={`flex gap-4 items-center p-1.5 ${theme.theme} rounded-lg`}>
      <img className="max-h-16 max-w-16" src={avatar} alt="" />
      <div className="">
        <h1 className="">{name}</h1>
        <p className="text-gray-300">@{username}</p>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default Friend;
