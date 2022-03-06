import { BrowserRouter } from "react-router-dom";
import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/header";
import LeftPanel from "./components/main/leftPanel";
import RightPanel from "./components/main/rightPanel";
import { loadUser } from "./redux/actions/auth.action";
import { getPosts } from "./redux/actions/post.action";
import { makeNarrow, makeWide } from "./redux/actions/ui.action";
import { MainRoutes, AuthRoutes } from "./components/main/routes";

// component for authentication stuff
const Authentication: FC = () => {
  return (
    <div className="container mx-auto px-3">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen lg:flex-row items-center justify-center gap-8 lg:gap-40 mb-8">
          <div className="hidden lg:block text-center rounded-full pt-8 lg:pt-0">
            <img
              src="/images/social.png"
              alt="Social Logo"
              className="max-w-sm"
            />
          </div>
          <div>
            <AuthRoutes />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

//  component for main page
const MainApp: FC = () => {
  const dispatch = useDispatch();
  const narrow: boolean = useSelector((state: any) => state.ui.narrow);
  const theme = useSelector((state: any) => state.ui.theme);
  const setNarrow = (val: boolean) => {
    console.log(narrow);
    if (narrow) {
      dispatch(makeWide());
    } else dispatch(makeNarrow());
  };

  const toggleSidebar = () => setNarrow(!narrow);

  return (
    <div
      className="container mx-auto px-1 md:px-3"
      style={{ maxWidth: "1150px" }}
    >
      <BrowserRouter>
        <Header />
        <div className="w-full text-white relative h-full">
          <LeftPanel toggle={toggleSidebar} />
          <div
            className={`flex flex-col ${
              theme.theme_bg
            } rounded-r-lg md:rounded-none p-2 absolute flex-grow top-0 overflow-auto no-scrollbar pb-12 ${
              narrow
                ? "left-14 md:left-20 narrow-width"
                : "left-32 md:left-52 not-narrow-width"
            }`}
            style={{ height: "calc(100vh - 65px)", scrollbarWidth: "none" }}
          >
            <MainRoutes />
          </div>
          <RightPanel narrow={narrow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

const App: FC = () => {
  const dispatch = useDispatch();

  // loading the user on app load (on each refreshing of the page)
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getPosts());
  }, [dispatch]);

  // check user is logged in or not from the redux state
  const loggedIn = useSelector((state: any) => state.auth.isAuthenticated);
  return <>{loggedIn ? <MainApp /> : <Authentication />}</>;
};

export default App;
