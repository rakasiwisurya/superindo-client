import {
  addTransaction,
  clearCart,
  deleteCart,
  setProductVariants,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { formatNumber, sum } from "@/utils";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Table, Typography } from "antd";
import { useEffect } from "react";

const { Text } = Typography;

const SideContent = () => {
  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.cart);
  const { productVariants } = useAppSelector((state) => state.productVariant);

  useEffect(() => {
    return () => {
      dispatch(clearCart());
    };
  }, [dispatch]);

  const handleDelete = (record: any) => {
    dispatch(deleteCart(record));
    dispatch(setProductVariants(productVariants));
  };

  const handleBuy = () => {
    const products = {
      products: carts.map((cart) => ({
        qty: cart.qty,
        product_variant_id: cart.id,
      })),
    };

    dispatch(addTransaction(products));
  };

  return (
    <aside className="aside-content">
      <Card
        title={
          <Flex gap={5}>
            <ShoppingCartOutlined />
            <span>Cart</span>
          </Flex>
        }
        type="inner"
        style={{ marginBottom: 20 }}
      >
        <Table
          size="small"
          columns={[
            {
              key: "product_variant_name",
              dataIndex: "product_variant_name",
              title: "Product",
            },
            {
              key: "price",
              dataIndex: "price",
              title: "Price",
              render: (text) => (text ? `Rp. ${formatNumber(text)}` : "-"),
            },
            {
              key: "qty",
              dataIndex: "qty",
              title: "Qty",
              render: (text) => (text ? `${formatNumber(text)}` : "-"),
            },
            {
              key: "subTotal",
              dataIndex: "subTotal",
              title: "Subtotal",
              fixed: "right",
              render: (text) => (text ? `Rp. ${formatNumber(text)}` : "-"),
            },
            {
              key: "action",
              fixed: "right",
              render: (text, record) => (
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => handleDelete(record)}
                  danger
                />
              ),
            },
          ]}
          dataSource={carts}
          scroll={{ x: "max-content" }}
          pagination={false}
          rowKey="id"
          bordered
        />

        <Divider />

        <Flex justify="space-between">
          <Text strong>Total</Text>
          <Text strong>{`Rp. ${formatNumber(sum(carts, "subTotal"))}`}</Text>
        </Flex>
      </Card>

      <Card>
        <Button type="primary" onClick={handleBuy} block disabled={carts.length <= 0}>
          Buy
        </Button>
      </Card>
    </aside>
  );
};

export default SideContent;
