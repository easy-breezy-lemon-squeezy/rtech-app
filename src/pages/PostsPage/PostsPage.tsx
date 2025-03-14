import React, { useRef, useCallback, FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../../shared/api/api";
import Loader from "../../shared/ui/Loader";
import { Card, Spin, Alert, Typography, Avatar, Badge } from "antd";
import {
  FileTextOutlined,
  LoadingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
interface Post {
  id: number;
  title: string;
  body: string;
}
const PostsList: FC = () => {
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
    (node: HTMLDivElement | null) => {
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

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
          className="max-w-3xl mx-auto"
        />
      </div>
    );

  return (
    <div className="bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Title level={1} className="text-center mb-8 text-blue-700">
            Latest Posts
          </Title>

          <div className="space-y-4">
            {data?.pages.map((page, pageIndex) => (
              <Fragment key={pageIndex}>
                {page.map((post: Post, postIndex) => {
                  const isLastItem =
                    pageIndex === data.pages.length - 1 &&
                    postIndex === page.length - 1;

                  return (
                    <div
                      key={post.id}
                      ref={isLastItem ? lastPostRef : null}
                      className="animate-fadeIn"
                      style={{ animationDelay: `${postIndex * 0.05}s` }}
                    >
                      <Card
                        hoverable
                        className="shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border-0"
                      >
                        <Link to={`/post/${post.id}`} className="block">
                          <div className="flex items-start">
                            <div className="mr-4">
                              <Badge
                                count={post.id}
                                className="site-badge-count-4"
                              >
                                <Avatar
                                  icon={<FileTextOutlined />}
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500"
                                  size={48}
                                />
                              </Badge>
                            </div>
                            <div className="flex-1">
                              <Title
                                level={3}
                                className="mb-2 text-gray-800 hover:text-blue-600 transition-colors capitalize line-clamp-2"
                                ellipsis={{ rows: 2, tooltip: post.title }}
                              >
                                {post.title}
                              </Title>

                              <div className="flex justify-between items-center mt-2">
                                <Text type="secondary" className="text-sm">
                                  <MessageOutlined className="mr-1" /> Click to
                                  read more
                                </Text>
                                <div className="text-blue-600 font-semibold">
                                  Post #{post.id}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>

          <div className="text-center py-6">
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Spin
                  tip="Loading more posts..."
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
            )}
            {!hasNextPage && (
              <Alert message="You've reached the end" type="info" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsList;
