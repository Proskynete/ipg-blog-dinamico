import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main.layout";
import { lazy } from "react";
import ProtectedRoute from "./protected-route";

const Home = lazy(() => import("../screens/home"));
const CreateNewPost = lazy(() => import("../screens/posts/create-post"));
const AllPosts = lazy(() => import("../screens/posts/all-posts"));
const Profile = lazy(() => import("../screens/profile"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/posts",
        children: [
          {
            index: true,
            Component: AllPosts,
          },
          {
            path: ":slug",
            Component: Home,
          },
        ],
      },
      {
        path: "/my-workspace",
        element: <ProtectedRoute />,
        children: [
          { index: true, Component: Profile },
          { path: "create-new-post", Component: CreateNewPost },
        ],
      },
    ],
  },
]);
