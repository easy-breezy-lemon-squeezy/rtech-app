import React, { FC } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { userRoutes } from "./user.routes";
import PostsPage from "../../pages/PostsPage/PostsPage";
import PostDetailsPage from "../../pages/PostDetailsPage/PostDetailsPage";
const Navigation: FC = () => {
  const router = createHashRouter([
    ...userRoutes.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
    {
      path: "/post/:id",
      element: <PostDetailsPage />,
    },
    {
      path: "/#/post/:id",
      element: <PostDetailsPage />,
    },
    {
      path: "/",
      element: <PostsPage />,
    },
    {
      path: "/#/",
      element: <PostsPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Navigation;
