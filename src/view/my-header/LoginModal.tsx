import React, { useState } from "react";
import api from "../../api/api";
import { Modal, Form, Input, Button, Spin, notification } from "antd";

import { useDispatch } from "react-redux";
import { userSlice } from "../../store/userState";
type props = React.ComponentProps<typeof Modal> & { myOnCancel: VoidFunction };

type ResponseDat = {
  token: string;
};

const LoginModal: React.FC<props> = ({
  open: isModalOpen,
  myOnCancel: handleCancel,
}) => {
  const dispatch = useDispatch();
  const [pop, contextHolder] = notification.useNotification();
  const openSuscessNoti = () => {
    pop["success"]({
      message: "Đăng nhập thành công",
      placement: "bottomRight",
    });
  };

  const openErrorNoti = (message: string) => {
    pop["error"]({
      message: message,
      placement: "bottomRight",
    });
  };

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userNameValue = Form.useWatch("userName", form);
  const passwordValue = Form.useWatch("password", form);

  const Login = async () => {
    try {
      setIsLoading(true);
      const res: ResponseDat = await api.post("/user/login", {
        userName: userNameValue,
        password: passwordValue,
      });
      localStorage.setItem("token", res.token);
      openSuscessNoti();
      setIsLoading(false);
      handleCancel();
      form.resetFields();
      dispatch(userSlice.actions.setLogin(true));
      dispatch(userSlice.actions.setName(userNameValue));
    } catch (error) {
      console.log(error);
      if (typeof error === "string") {
        openErrorNoti(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Login"
      open={isModalOpen}
      onCancel={handleCancel}
      centered={true}
      onOk={Login}
      footer={
        !isLoading ? (
          [
            <Button
              key="submit"
              type="primary"
              onClick={Login}
              disabled={!(userNameValue && passwordValue)}
            >
              Submit
            </Button>,
          ]
        ) : (
          <Spin key="load" />
        )
      }
    >
      {contextHolder}
      <Form form={form}>
        <Form.Item label="Username" name="userName">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default LoginModal;
