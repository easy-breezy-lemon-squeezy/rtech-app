// PostDetail.tsx
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useCommentsByPostId, usePostById } from "../../shared/api/api";
import {
  Avatar,
  Button,
  Card,
  Typography,
  Divider,
  Spin,
  List,
  Alert,
} from "antd";
import {
  UserOutlined,
  MessageOutlined,
  ArrowLeftOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Loader from "../../shared/ui/Loader";
import { useTypedNavigation } from "../../shared/hooks/useTypedNavigation";
const { Title, Paragraph, Text } = Typography;

interface Comment {
  id: number;
  body: string;
  postId: number;
}
const PostDetailsPage: FC = () => {
  const { id } = useParams();

  const comments = useCommentsByPostId(Number(id));
  const post = usePostById(Number(id));

  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const navigate = useTypedNavigation();

  const handleClick = () => {
    navigate("post");
  };
  const [showComments, setShowComments] = useState(false);
  if (comments.isLoading) return <Loader />;
  if (comments.isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          message="Error"
          description={comments.error.message}
          type="error"
          showIcon
          className="max-w-3xl mx-auto"
        />
      </div>
    );
  }
  if (!post.data)
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert message="The post was not found" type="info" />
      </div>
    );
  if (!comments.data)
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert message="No comments" type="info" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="mb-4 hover:text-blue-600 transition-colors"
          size="large"
          onClick={handleClick}
        >
          Back to Posts
        </Button>

        <Card className="shadow-lg rounded-lg overflow-hidden border-0">
          <Title
            level={1}
            className="text-center mb-6 text-3xl font-bold text-gray-800 capitalize"
          >
            {post.data.title}
          </Title>

          <Divider className="my-4" />

          <Paragraph className="text-lg text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            {post.data.body}
          </Paragraph>

          <Divider className="my-6" />

          <div className="text-center">
            <Button
              type="primary"
              icon={<MessageOutlined />}
              onClick={toggleComments}
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {showComments ? "Hide Comments" : "Show Comments"}
            </Button>
          </div>

          {showComments && (
            <div className="mt-8">
              <Title level={3} className="mb-4 text-gray-700 flex items-center">
                <CommentOutlined className="mr-2" />
                Comments
              </Title>

              {comments.isLoading && (
                <div className="text-center py-6">
                  <Spin tip="Loading comments..." />
                </div>
              )}

              {comments.isError && <></>}

              {!comments.isLoading &&
              !comments.isError &&
              comments.data &&
              comments.data.length > 0 ? (
                <List
                  className="comment-list bg-gray-50 rounded-lg p-4"
                  itemLayout="horizontal"
                  dataSource={comments.data}
                  renderItem={(comment: Comment) => (
                    <List.Item className="border-b border-gray-200 last:border-0 py-4">
                      <div className="flex w-full">
                        <div className="mr-4">
                          <Avatar
                            icon={<UserOutlined />}
                            className="bg-blue-500"
                            size="large"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <Paragraph className="text-gray-700 mb-0">
                              {comment.body}
                            </Paragraph>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Comment ID: {comment.id}
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <Text type="secondary">No comments available</Text>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PostDetailsPage;
