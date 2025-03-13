// PostDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";

import { useCommentsByPostId, usePostById } from "../../shared/api/api";

const PostDetailsPage: React.FC = () => {
  const { id } = useParams();

  const comments = useCommentsByPostId(Number(id));
  const post = usePostById(Number(id));

  if (comments.isLoading) return <div>Загрузка...</div>;
  if (comments.isError) return <div>Ошибка: {comments.error.message}</div>;
  if (!post.data) return <div>Пост не найден</div>;
  if (!comments.data) return <div>Нет комментариев</div>;

  return (
    <div className="post-detail">
      <Link to="/">&larr; Назад к списку</Link>
      <h2>{post.data[0].title}</h2>
      <h2>{post.data[0].body}</h2>
      <ul>
        {comments.data.map((comment, i) => (
          <li key={comment.id}>
            <h2>{comment.body}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetailsPage;
