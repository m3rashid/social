import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Authentication things
import Login from "../auth/login";
import Signup from "../auth/signup";
import Guidelines from "../auth/instructions";
import ForgotPassword from "../auth/forgotPassword";
import ResetPassword from "../auth/resetPassword";

// Main App things
import Home from "./home";
import Friends from "./home/friends";
import SavedPosts from "./home/savedPosts";
import EventsToday from "./home/eventsToday";
import Instructions from "./home/instructions";
import AboutUs from "./home/aboutUs";

import Chat from "./chat";
import GlobalChat from "./chat/global";

import Profile from "./profile";
import EditProfile from "./profile/edit";

import Settings from "./settings";
import UserSettings from "./settings/user";
import Help from "./settings/help";
import Privacy from "./settings/privacy";
import Security from "./settings/security";

import Notifications from "./notifications";

// import PageNotFound from "./pageNotFound";

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/home/feed/*" element={<Home />} />
      <Route path="/home/friends/*" element={<Friends />} />
      <Route path="/home/saved/*" element={<SavedPosts />} />
      <Route path="/home/events/*" element={<EventsToday />} />
      <Route path="/home/instructions/*" element={<Instructions />} />
      <Route path="/home/about/*" element={<AboutUs />} />

      <Route path="/chat/global/*" element={<GlobalChat />} />
      <Route path="/chat/:username/*" element={<Chat />} />

      <Route path="/user/edit/*" element={<EditProfile />} />
      <Route path="/user/:username/*" element={<Profile />} />

      <Route path="/settings/all/*" element={<Settings />} />
      <Route path="/settings/user/*" element={<UserSettings />} />
      <Route path="/settings/help/*" element={<Help />} />
      <Route path="/settings/privacy/*" element={<Privacy />} />
      <Route path="/settings/security/*" element={<Security />} />

      <Route path="/notifications/all/*" element={<Notifications />} />
      <Route path="*" element={<Navigate to="/home/feed" />} />
    </Routes>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/guidelines" element={<Guidelines />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/guidelines" />} />
    </Routes>
  );
};

export { MainRoutes, AuthRoutes };
