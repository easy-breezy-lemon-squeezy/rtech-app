import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = process.env.REACT_APP_URL;

interface Post {
  id: number;
  title: string;
  body: string;
}

export const usePosts = () => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get<Post[]>(`${URL}/posts`, {
        params: {
          _limit: 10,
          _start: pageParam,
        },
      });

      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
    refetchOnWindowFocus: false,
  });
};

interface Comment {
  id: number;
  body: string;
  postId: number;
}
export const useCommentsByPostId = (postId: number) => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments" + postId],
    queryFn: async () => {
      const response = await axios.get<Comment[]>(
        `${URL}/comments?postId=${postId}`
      );
      return response.data;
    },
  });
};

interface Post {
  id: number;
  title: string;
  body: string;
}
export const usePostById = (postId: number) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts" + postId],
    queryFn: async () => {
      const response = await axios.get<Post[]>(`${URL}/posts?id=${postId}`);
      return response.data;
    },
  });
};
