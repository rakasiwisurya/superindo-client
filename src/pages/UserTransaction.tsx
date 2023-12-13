import { Container, Loading, ModalUserTransactionDetail, Navbar } from "@/components";
import { clearUser, getUserTransactions, useAppDispatch, useAppSelector } from "@/redux";
import { formatNumber } from "@/utils";
import { Card, Col, Empty, Flex, Layout, QRCode, Row, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const { Text, Title } = Typography;

const UserTransaction = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [isModalTransactionDetailOpen, setIsModalTransactionDetailOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { isUserTransactionsLoading, userTransactions } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserTransactions());

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  const handleModalDetailOpen = (id: any) => {
    setTransactionId(id);
    setIsModalTransactionDetailOpen(true);
  };
  const handleModalDetailClose = () => {
    setTransactionId(null);
    setIsModalTransactionDetailOpen(false);
  };

  if (isUserTransactionsLoading) return <Loading />;

  return (
    <>
      <Layout>
        <Navbar />

        <Container>
          <Title level={2} style={{ fontSize: 18 }}>
            Your Transactions
          </Title>

          <Row gutter={[16, 16]} style={{ margin: "16px 0" }}>
            {userTransactions.length > 0 ? (
              userTransactions.map((userTransaction) => (
                <Col key={userTransaction.id} xs={24} md={12}>
                  <Card
                    style={{ width: "100%", cursor: "pointer" }}
                    onClick={() => handleModalDetailOpen(userTransaction.id)}
                  >
                    <Flex gap={10} align="center" justify="space-between">
                      <Flex align="center" vertical>
                        <QRCode value={userTransaction.transaction_no} errorLevel="H" />
                        <Text strong style={{ fontSize: 16 }}>
                          {userTransaction.transaction_no}
                        </Text>
                      </Flex>

                      <Flex vertical gap={35} justify="space-between" style={{ textAlign: "end" }}>
                        <Text strong style={{ fontSize: 35 }}>
                          {userTransaction.created_user}
                        </Text>

                        <Flex vertical justify="flex-end">
                          <Text strong style={{ fontSize: 12 }}>
                            {moment(userTransaction.created_date).format("DD MMMM YYYY HH:mm")}
                          </Text>
                          <Text strong style={{ fontSize: 20 }}>
                            {`Rp. ${formatNumber(userTransaction.total_amount)}`}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                </Col>
              ))
            ) : (
              <Flex
                justify="center"
                align="center"
                style={{ width: "100%", height: "calc(100vh - (64px + 47px))" }}
              >
                <Empty />
              </Flex>
            )}
          </Row>
        </Container>
      </Layout>

      {transactionId && isModalTransactionDetailOpen && (
        <ModalUserTransactionDetail
          id={transactionId}
          isOpen={isModalTransactionDetailOpen}
          onCancel={handleModalDetailClose}
        />
      )}
    </>
  );
};

export default UserTransaction;
