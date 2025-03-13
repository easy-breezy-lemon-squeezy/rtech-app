import PostDetailsPage from "../../pages/PostDetailsPage/PostDetailsPage";
import PostsPage from "../../pages/PostsPage/PostsPage";
import { IRoute } from "./navigation.types";

export const userRoutes: IRoute[] = [
  {
    path: "post",
    component: PostsPage,
  },
  {
    path: "post",
    component: PostDetailsPage,
  },
];
