// PostDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";

import { useCommentsByPostId, usePostById } from "../../shared/api/api";

const PostDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useCommentsByPostId(Number(id));
  const post = usePostById(Number(id));

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error.message}</div>;
  if (!data) return <div>Пост не найден</div>;

  return (
    <div className="post-detail">
      <Link to="/">&larr; Назад к списку</Link>
    </div>
  );
};

export default PostDetailsPage;
