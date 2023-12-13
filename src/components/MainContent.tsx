import {
  addCart,
  clearProductVariant,
  getProductVariants,
  setProductVariants,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { formatNumber, parseNumber } from "@/utils";
import { Button, Card, Col, Empty, Flex, Image, InputNumber, Row, Typography } from "antd";
import { useEffect } from "react";

const { Text } = Typography;

const MainContent = () => {
  const dispatch = useAppDispatch();
  const { productVariants } = useAppSelector((state) => state.productVariant);
  const { carts } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductVariants());

    return () => {
      clearProductVariant();
    };
  }, [dispatch]);

  const handleIncrement = (id: any, value: number, qty: number) => {
    if (value < qty) {
      const newProductVariants = productVariants?.map((productVariant) => {
        if (id === productVariant.id) {
          return {
            ...productVariant,
            value: value + 1,
          };
        }
        return productVariant;
      });
      dispatch(setProductVariants(newProductVariants));
    }
  };
  const handleDecrement = (id: any, value: number) => {
    if (value > 0) {
      const newProductVariants = productVariants?.map((productVariant) => {
        if (id === productVariant.id) {
          return {
            ...productVariant,
            value: value - 1,
          };
        }
        return productVariant;
      });
      dispatch(setProductVariants(newProductVariants));
    }
  };

  const handleAddToCart = (productVariant: any) => {
    const selectedProductVariant = {
      id: productVariant.id,
      product_variant_name: productVariant.name,
      price: productVariant.price,
      qty: productVariant.value,
      subTotal: productVariant.price * productVariant.value,
    };

    dispatch(addCart(selectedProductVariant));
  };

  return (
    <main className="main-content">
      <Row gutter={[16, 16]}>
        {productVariants.length > 0 ? (
          productVariants.map((productVariant) => (
            <Col key={productVariant.id} md={24} lg={8}>
              <Card style={{ height: "100%" }}>
                <Text strong style={{ fontSize: 17 }}>
                  {productVariant.name}
                </Text>
                <div style={{ margin: "12px 0" }}>
                  <Image
                    src={productVariant.image_location}
                    alt={productVariant.name}
                    style={{ aspectRatio: 1, objectFit: "cover" }}
                  />
                </div>
                <Flex justify="space-between">
                  <Text strong>{formatNumber(productVariant.qty)} unit</Text>
                  <Text strong>Rp. {formatNumber(productVariant.price)}</Text>
                </Flex>

                <Flex gap={10} style={{ margin: "10px 0" }}>
                  <Button
                    type="primary"
                    size="small"
                    danger
                    onClick={() => handleDecrement(productVariant.id, productVariant.value)}
                    style={{ width: 25 }}
                    disabled={
                      productVariant.value <= 0 ||
                      !!carts.find((cart) => cart.id === productVariant.id)
                    }
                  >
                    -
                  </Button>
                  <InputNumber
                    value={productVariant.value}
                    size="small"
                    max={productVariant.qty}
                    className="input-number-center"
                    style={{ width: "100%" }}
                    formatter={(value) => formatNumber(value)}
                    parser={(value) => parseNumber(value)}
                    disabled={!!carts.find((cart) => cart.id === productVariant.id)}
                  />
                  <Button
                    type="primary"
                    size="small"
                    onClick={() =>
                      handleIncrement(productVariant.id, productVariant.value, productVariant.qty)
                    }
                    style={{ width: 25 }}
                    disabled={
                      productVariant.value >= productVariant.qty ||
                      !!carts.find((cart) => cart.id === productVariant.id)
                    }
                  >
                    +
                  </Button>
                </Flex>

                <Button
                  type="primary"
                  block
                  onClick={() => handleAddToCart(productVariant)}
                  disabled={
                    productVariant.value === 0 ||
                    !!carts.find((cart) => cart.id === productVariant.id)
                  }
                >
                  Add To Cart
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty />
          </Col>
        )}
      </Row>
    </main>
  );
};

export default MainContent;
