import Friend from "./friend";

const friend = {
  username: "m3rashid",
  name: "MD Rashid hUssain",
  avatar: "/images/logo.png",
  id: "fsdkfajsdf",
};

const Friends = () => {
  return (
    <div className="flex flex-col justify-center gap-4 mb-4">
      <div>
        <h1 className="p-2 rounded-lg text-2xl">Friend Requests</h1>
        <div className="flex flex-col justify-center gap-2">
          {[0, 1, 2].map(() => (
            <Friend
              username={friend.username}
              name={friend.name}
              avatar={friend.avatar}
              key={friend.id}
              id={friend.id}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="p-2 rounded-lg text-2xl">Friends</h1>
        <div className="flex flex-col justify-center gap-2">
          {[0, 1, 2, 3, 4, 5].map(() => (
            <Friend
              username={friend.username}
              name={friend.name}
              avatar={friend.avatar}
              key={friend.id}
              id={friend.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
