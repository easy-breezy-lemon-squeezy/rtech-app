import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../../shared/api/api";

const PostsList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePosts();

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isFetchingNextPage || !node) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error.message}</div>;

  return (
    <div className="posts-list">
      <h1>Список постов</h1>
      <ul>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((post, index) => (
              <li
                key={post.id}
                ref={
                  i === data.pages.length - 1 && index === page.length - 1
                    ? lastPostRef
                    : null
                }
              >
                <Link to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      {isFetchingNextPage && <div>Загрузка дополнительных данных...</div>}

      {!hasNextPage && <div>Больше постов нет</div>}
    </div>
  );
};

export default PostsList;
