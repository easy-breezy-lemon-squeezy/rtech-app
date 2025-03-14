// PostDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";

import { useCommentsByPostId, usePostById } from "../../shared/api/api";
import { UserOutlined } from "@ant-design/icons";
const PostDetailsPage: React.FC = () => {
  const { id } = useParams();

  const comments = useCommentsByPostId(Number(id));
  const post = usePostById(Number(id));

  if (comments.isLoading) return <div>Loading...</div>;
  if (comments.isError) return <div>Error: {comments.error.message}</div>;
  if (!post.data) return <div>The post was not found</div>;
  if (!comments.data) return <div>No comments</div>;

  return (
    <div className="post-detail">
      <Link to="/">&larr; Back to the list</Link>
      <h2>{post.data[0].title}</h2>
      <h2>{post.data[0].body}</h2>
      <ul>
        {comments.data.map((comment, i) => (
          <li key={comment.id} className="flex">
            <UserOutlined />
            <h2>{comment.body}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetailsPage;
