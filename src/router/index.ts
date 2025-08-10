import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main.layout";
import { lazy } from "react";

const Home = lazy(() => import("../screens/home"));
const MyPosts = lazy(() => import("../screens/my-posts"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/my-posts",
        Component: MyPosts,
      },
    ],
  },
]);
