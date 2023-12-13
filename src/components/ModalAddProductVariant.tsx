import {
  addProductVariant,
  getProductVariants,
  resetAddProductVariant,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { IModalCommonProps } from "@/types";
import { formatNumber, parseNumber } from "@/utils";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Image, Input, InputNumber, Modal, Select, Upload, notification } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";

const { Dragger } = Upload;

const ModalAddProductVariant = ({ isOpen, onCancel }: IModalCommonProps) => {
  const [file, setFile] = useState<any>(null);
  const [previewFile, setPreviewFile] = useState<any>(null);

  const dispatch = useAppDispatch();
  const { isAddProductVariantLoading, addProductVariantSuccess } = useAppSelector(
    (state) => state.productVariant
  );
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setPreviewFile(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (addProductVariantSuccess) {
      notification.success({ message: "Success", description: addProductVariantSuccess });
      dispatch(getProductVariants());
      dispatch(resetAddProductVariant());
      onCancel();
    }
  }, [dispatch, onCancel, addProductVariantSuccess]);

  const handleUploadFile = (file: RcFile) => {
    setFile(file);
    setPreviewFile(URL.createObjectURL(file));
    return false;
  };

  const handleSubmit = (values: any) => {
    const formData = new FormData();

    formData.set("code", values.code);
    formData.set("name", values.name);
    formData.set("price", values.price);
    formData.set("qty", values.qty);
    formData.set("product_id", values.product_id);

    if (file) formData.set("image_location", file);

    dispatch(addProductVariant(formData));
  };

  return (
    <Modal
      title="Add Product Variant"
      open={isOpen}
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{
        htmlType: "submit",
        form: "formAddProductVariant",
        loading: isAddProductVariantLoading,
      }}
      destroyOnClose
    >
      <Form id="formAddProductVariant" onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Code" name="code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber
            prefix="Rp."
            formatter={(value) => formatNumber(value)}
            parser={(value) => parseNumber(value)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Qty" name="qty" rules={[{ required: true }]}>
          <InputNumber
            formatter={(value) => formatNumber(value)}
            parser={(value) => parseNumber(value)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Product" name="product_id" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Select a product"
            optionFilterProp="children"
            filterOption={(input: string, option?: { label: string; value: string }) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={products?.map((productCategory) => ({
              label: productCategory.name,
              value: productCategory.id,
            }))}
          />
        </Form.Item>

        <Form.Item label="Image">
          <Dragger
            name="image"
            multiple={false}
            beforeUpload={handleUploadFile}
            accept="image/*"
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">For a single upload and strictly image file only.</p>
          </Dragger>

          <Image src={previewFile} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProductVariant;
