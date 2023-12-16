import { Flex, Spin } from "antd";
import { CSSProperties } from "react";

interface ILoading {
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
}

const Loading = ({ height, width }: ILoading) => {
  return (
    <Flex align="center" justify="center" style={{ height: height ?? 300, width: width ?? "auto" }}>
      <Spin />
    </Flex>
  );
};

export default Loading;
