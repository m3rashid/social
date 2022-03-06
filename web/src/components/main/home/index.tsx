import { Routes, Route } from "react-router-dom";

import CustomContainer from "../../utils/customContainer";
import CreatePost from "./CreatePost";
// import Post from "./post";

import Friends from "./friends";
import SavedPosts from "./savedPosts";
import EventsToday from "./eventsToday";
import Instructions from "./instructions";
import AboutUs from "./aboutUs";
// import LoadingSpinner from "../../utils/loadingSpinner";
import { useSelector } from "react-redux";
import Post, { PostType } from "./post";

export interface UserType {
  _id: string;
  __v: number;
  name: string;
  username: string;
  email: string;
  dob?: string;
  salt?: string;
  hash?: string;
  avatar?: string;
  bio?: string;
  websiteUrl?: string;
  friends?: string[];
  sentFriendRequests?: string[];
  receivedFriendRequests?: string[];
  posts?: string[];
  saved?: string[];
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const user = useSelector((state: any) => state.auth.user);
  const posts = useSelector((state: any) => state.post.posts);
  return (
    <>
      <CustomContainer styles="flex flex-col gap-2">
        <CreatePost user={user} />
      </CustomContainer>
      <CustomContainer>
        {posts
          .slice()
          .reverse()
          .map((post: PostType) => {
            return <Post key={post._id} post={post} />;
          })}
      </CustomContainer>

      <Routes>
        <Route path="/home/friends" element={<Friends />} />
        <Route path="/home/saved" element={<SavedPosts />} />
        <Route path="/home/events" element={<EventsToday />} />
        <Route path="/home/instructions" element={<Instructions />} />
        <Route path="/home/about" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default Home;
