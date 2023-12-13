import { clearTransaction, getUserTransaction, useAppDispatch, useAppSelector } from "@/redux";
import { IModalEditCommonProps } from "@/types";
import { Card, Col, Form, Input, Modal, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import Loading from "./Loading";

const ModalUserTransactionDetail = ({ id, isOpen, onCancel }: IModalEditCommonProps) => {
  const dispatch = useAppDispatch();
  const { isUserTransactionLoading, userTransaction } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id && isOpen) dispatch(getUserTransaction({ id }));

    return () => {
      dispatch(clearTransaction());
    };
  }, [dispatch, id, isOpen]);

  if (isUserTransactionLoading)
    return (
      <Modal title="Transaction Detail" open={isOpen} onCancel={onCancel} footer={false} centered>
        <Loading />
      </Modal>
    );

  return (
    <Modal title="Transaction Detail" open={isOpen} onCancel={onCancel} footer={false} centered>
      <Form layout="vertical">
        <Form.Item label="Transaction Number">
          <Input value={userTransaction?.transaction_no} disabled />
        </Form.Item>

        <Form.Item label="Transaction Number">
          <Input value={userTransaction?.total_amount} disabled />
        </Form.Item>

        <Form.Item label="Transaction User">
          <Input value={userTransaction?.created_user} disabled />
        </Form.Item>

        <Form.Item label="Transaction Date">
          <Input
            value={moment(userTransaction?.created_date).format("DD MMMM YYYY HH:mm")}
            disabled
          />
        </Form.Item>

        <Row gutter={[16, 16]}>
          {userTransaction?.transaction_details?.length > 0 &&
            userTransaction?.transaction_details?.map((transaction_detail: any) => (
              <Col span={24}>
                <Card style={{ width: "100%", cursor: "auto" }} hoverable>
                  <Form.Item label="PLU">
                    <Input value={transaction_detail?.product_plu} disabled />
                  </Form.Item>

                  <Form.Item label="Product Variant Name">
                    <Input value={transaction_detail?.product_variant_name} disabled />
                  </Form.Item>

                  <Form.Item label="Product Name">
                    <Input value={transaction_detail?.product_name} disabled />
                  </Form.Item>

                  <Form.Item label="Product Category Name">
                    <Input value={transaction_detail?.product_category_name} disabled />
                  </Form.Item>

                  <Form.Item label="Price">
                    <Input value={transaction_detail?.product_variant_price} disabled />
                  </Form.Item>

                  <Form.Item label="Qty">
                    <Input value={transaction_detail?.qty} disabled />
                  </Form.Item>

                  <Form.Item label="Subtotal">
                    <Input value={transaction_detail?.subtotal} disabled />
                  </Form.Item>
                </Card>
              </Col>
            ))}
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalUserTransactionDetail;
