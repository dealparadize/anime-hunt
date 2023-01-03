import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

type LoginModalProps = {
  open?: boolean;
  onClose?: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ open = false, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
    setConfirmLoading(true);
    setTimeout(() => {
      onClose?.();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    onClose?.();
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Login"
        open={open}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        okText="Login"
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 6, message: "Minimum of characters for the user is 6!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
