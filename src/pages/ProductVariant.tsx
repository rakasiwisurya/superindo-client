import { ButtonCustom, ModalAddProductVariant, ModalEditProductVariant } from "@/components";
import {
  clearProduct,
  clearProductVariant,
  deleteProductVariant,
  getProductVariants,
  getProducts,
  resetDeleteProductVariant,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { formatNumber } from "@/utils";
import { DeleteOutlined, EditOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { Button, Divider, Flex, Image, Modal, Table, Typography, notification } from "antd";
import { ColumnType } from "antd/es/table";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const { Title } = Typography;

const ProductVariant = () => {
  const dispatch = useAppDispatch();
  const { isProductVariantsLoading, productVariants, deleteProductVariantSuccess } = useAppSelector(
    (state) => state.productVariant
  );

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const columns = useRef<ColumnType<any>[]>([
    {
      title: "Image",
      dataIndex: "image_location",
      key: "image_location",
      align: "center",
      render: (text: any) => (text ? <Image width={100} src={text} /> : "-"),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text: any) => (text ? `Rp. ${formatNumber(text)}` : "-"),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      render: (text: any) => (text ? formatNumber(text) : "-"),
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Created User",
      dataIndex: "created_user",
      key: "created_user",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
      render: (text: any) => (text ? moment(text).format("LLLL") : "-"),
    },
    {
      title: "Updated User",
      dataIndex: "updated_user",
      key: "updated_user",
      align: "center",
      render: (text: any) => text ?? "-",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      key: "updated_date",
      align: "center",
      render: (text: any) => (text ? moment(text).format("LLLL") : "-"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Flex gap={10}>
          <ButtonCustom
            variant="outline-warning"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Flex>
      ),
    },
  ]);

  useEffect(() => {
    dispatch(getProductVariants());
    dispatch(getProducts());

    return () => {
      dispatch(clearProductVariant());
      dispatch(clearProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteProductVariantSuccess) {
      notification.success({ message: "Success", description: deleteProductVariantSuccess });
      dispatch(resetDeleteProductVariant());
      dispatch(getProductVariants());
      Modal.destroyAll();
    }
  }, [dispatch, deleteProductVariantSuccess]);

  const handleEdit = (record: any) => {
    setEditId(record?.id);
    setIsModalEditOpen(true);
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      icon: <QuestionCircleFilled />,
      title: "Confirmation",
      content: `Are you sure want to delete ${record?.name} ?`,
      okText: "Hapus",
      centered: true,
      okButtonProps: { danger: true },
      onOk: () => dispatch(deleteProductVariant({ id: record?.id })),
    });
  };

  return (
    <section id="product">
      <Title level={2} style={{ fontSize: "1.1rem" }}>
        Product Variant
      </Title>

      <Divider />

      <Button type="primary" onClick={() => setIsModalAddOpen(true)} style={{ marginBottom: 20 }}>
        Add Product Variant
      </Button>

      <Table
        loading={isProductVariantsLoading}
        dataSource={productVariants}
        columns={columns.current}
        scroll={{ x: "max-content" }}
        rowKey="id"
        bordered
      />

      <ModalAddProductVariant isOpen={isModalAddOpen} onCancel={() => setIsModalAddOpen(false)} />

      <ModalEditProductVariant
        id={editId}
        isOpen={isModalEditOpen}
        onCancel={() => {
          setIsModalEditOpen(false);
          setEditId(null);
        }}
      />
    </section>
  );
};

export default ProductVariant;
