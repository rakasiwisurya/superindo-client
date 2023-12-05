import { Flex, Spin } from "antd";

const Loading = () => {
  return (
    <Flex align="center" justify="center" style={{ height: 300 }}>
      <Spin />
    </Flex>
  );
};

export default Loading;
