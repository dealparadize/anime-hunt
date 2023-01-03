import React, { useState } from "react";
import { Modal, Form, Input, notification } from "antd";
import useAuth from "../../context/Auth";

type LoginModalProps = {
  open?: boolean;
  onClose?: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ open = false, onClose }) => {
  const { login } = useAuth();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setConfirmLoading(true);
    form.submit();
  };

  const handleCancel = () => {
    onClose?.();
  };

  const onFinish = (values: any) => {
    login(values.username, values.password)
      .then(() => {
        notification.success({
          message: `Welcome ${values.username}`,
          description: "Logged in successfully",
          placement: "bottomRight",
        });
        form.resetFields();
        onClose?.();
      })
      .finally(() => setConfirmLoading(false));
  };

  const onFinishFailed = () => {
    notification.error({
      message: `Error on login`,
      description: "Try again",
      placement: "bottomRight",
    });
    onClose?.();
  };

  return (
    <>
      <Modal
        title="Login"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
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
