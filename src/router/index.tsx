import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main.layout";
import { lazy } from "react";
import ProtectedRoute from "./protected-route";

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
        element: <ProtectedRoute />,
        children: [
          { index: true, Component: MyPosts },
          { path: "edit/:id", Component: MyPosts },
        ],
      },
    ],
  },
]);
