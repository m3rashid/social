import Notification from "../../utils/notif";

const notifs = [
  { type: "success", notifMsg: "Hello there", key: "1" },
  { type: "failure", notifMsg: "Hello there", key: "2" },
  { type: "info", notifMsg: "Hello there", key: "3" },
];

const Notifications = () => {
  return (
    <div className="flex flex-col gap-2">
      {notifs.map((notif) => (
        <Notification
          imgSrc="/images/favicon.png"
          key={notif.key}
          type={notif.type}
          notifMsg={notif.notifMsg}
          notifTitle="A new Message"
        />
      ))}
    </div>
  );
};

export default Notifications;
