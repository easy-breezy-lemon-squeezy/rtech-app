import { Spin } from "antd";
import React, { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 75 }} spin />}
        tip="Loading post details..."
        size="large"
      />
    </div>
  );
};
export default Loader;
