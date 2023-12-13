import { ButtonCustom } from "@/components";
import { Empty, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
      <Empty
        description={
          <>
            <div style={{ fontWeight: "700", color: "#AEB8C2" }}>404 | Page Not Found</div>
            <ButtonCustom
              variant="secondary"
              onClick={() => navigate(-1)}
              style={{ marginTop: 20 }}
            >
              Back to Previous Page
            </ButtonCustom>
          </>
        }
      />
    </Flex>
  );
};

export default NotFound;
