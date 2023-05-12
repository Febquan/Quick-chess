import React from "react";
import { useEffect, useState } from "react";

import { Modal, Form, Input, Button, Spin, notification } from "antd";
import api from "../../api/api";

type props = React.ComponentProps<typeof Modal> & { myOnCancel: VoidFunction };
type checkNameRes = {
  message: string;
  ok: boolean;
};
const SignUpModal: React.FC<props> = ({
  open: isModalOpen,
  myOnCancel: handleCancel,
}) => {
  const [pop, contextHolder] = notification.useNotification();
  const openSuscessNoti = () => {
    pop["success"]({
      message: "Đăng ký thành công",
      description: "Hãy xác thực email của bạn !",
      placement: "bottomRight",
    });
  };
  const openErrorNoti = () => {
    pop["error"]({
      message: "Đăng ký không thành công",
      placement: "bottomRight",
    });
  };

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //EMAIL

  const emailValue = Form.useWatch("email", form);
  const [isvalidEmail, setIsvalidEmail] = useState<boolean>(false);
  const [isfirstEmail, setisfirstEmail] = useState<boolean>(true);
  const handleSetFirstEmail = () => {
    if (isfirstEmail) setisfirstEmail(false);
  };
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(emailValue);
      if (!isValid) {
        setIsvalidEmail(false);
      } else {
        setIsvalidEmail(true);
      }
    }, 600);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [emailValue]);

  //USERNAME
  const userNameValue = Form.useWatch("userName", form);
  const [isvalidUser, setIsvalidUser] = useState<boolean>(false);
  const [isfirstUser, setisfirstUser] = useState<boolean>(true);
  const handleSetFirstUser = () => {
    if (isfirstUser) setisfirstUser(false);
  };
  useEffect(() => {
    const idTimeout = setTimeout(async () => {
      try {
        const data: checkNameRes = await api.post("/user/checkUserName", {
          userName: userNameValue,
        });

        if (data.ok) {
          setIsvalidUser(true);
        } else {
          setIsvalidUser(false);
        }
      } catch (err) {
        console.log(err);
      }
    }, 600);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [userNameValue]);

  //Password
  const pas1 = Form.useWatch("password1", form);
  const pas2 = Form.useWatch("password2", form);
  const [isSamePas, setIsSamePas] = useState<boolean>(false);
  const [isValidPasLength, setisValidPasLength] = useState<boolean>(false);
  const [isValidPas, setisValidPas] = useState<boolean>(false);
  const [isfirstPas, setisfirstPas] = useState<boolean>(true);
  const handleSetFirstPas = () => {
    if (isfirstPas) setisfirstPas(false);
  };
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      if (pas1 && pas1.length >= 5) {
        setisValidPasLength(true);
      } else {
        setisValidPasLength(false);
      }

      const isValid = pas1 === pas2;
      if (!isValid) {
        setIsSamePas(false);
      } else {
        setIsSamePas(true);
      }

      if (isSamePas && isValidPasLength) {
        setisValidPas(true);
      } else {
        setisValidPas(false);
      }
    }, 600);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [isSamePas, isValidPasLength, pas1, pas2]);

  // SignUp
  const signUp = async () => {
    try {
      setIsLoading(true);
      await api.post("/user/signup", {
        userName: userNameValue,
        email: emailValue,
        password: pas1,
      });
      setIsLoading(false);
      handleCancel();
      form.resetFields();
      openSuscessNoti();
    } catch (err) {
      console.log(err);
      openErrorNoti();
    }
  };

  return (
    <Modal
      title="SignUp"
      open={isModalOpen}
      centered={true}
      okText="Submit"
      onOk={signUp}
      onCancel={handleCancel}
      footer={
        !isLoading ? (
          [
            <Button
              key="submit"
              type="primary"
              onClick={signUp}
              disabled={!(isValidPas && isvalidEmail && isvalidUser)}
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
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          validateStatus={
            isfirstEmail ? undefined : isvalidEmail ? "success" : "error"
          }
          help={
            isfirstEmail
              ? undefined
              : isvalidEmail
              ? ""
              : "Please enter valid Email!"
          }
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input onInput={handleSetFirstEmail} />
        </Form.Item>
        <Form.Item
          label="Username"
          name="userName"
          hasFeedback
          validateStatus={
            isfirstUser ? undefined : isvalidUser ? "success" : "error"
          }
          help={
            isfirstUser ? undefined : isvalidUser ? "" : "Tên đã được sử dụng!"
          }
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onInput={handleSetFirstUser} />
        </Form.Item>

        <Form.Item
          label="Password1"
          name="password1"
          validateStatus={
            isfirstPas ? undefined : isValidPasLength ? "success" : "error"
          }
          hasFeedback
          rules={[{ required: true, message: "Please input your password!" }]}
          help={
            isfirstPas
              ? undefined
              : isValidPasLength
              ? ""
              : "The password muts be over 5 characters"
          }
        >
          <Input.Password onInput={handleSetFirstPas} />
        </Form.Item>

        <Form.Item
          label="Password2"
          name="password2"
          hasFeedback
          validateStatus={
            isfirstPas ? undefined : isSamePas ? "success" : "error"
          }
          help={
            isfirstPas
              ? undefined
              : isSamePas
              ? ""
              : "The two passwords dont match!"
          }
          rules={[
            {
              required: true,
              message: "Please input your confirmation password!",
            },
          ]}
        >
          <Input.Password onInput={handleSetFirstPas} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SignUpModal;
