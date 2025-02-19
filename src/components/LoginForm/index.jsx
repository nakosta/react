import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.module.css";
import { useLoginUserMutation } from "../../tasksApi";

const { Title } = Typography;

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (values) => {
    try {
      const { token } = await loginUser(values).unwrap();
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/todolist");
      } else {
        console.error("There is no such user");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
      <Title level={5} className={styles.title}>
        Don't have an account? <Link to="/register">Sign Up!</Link>
      </Title>
    </div>
  );
};

export default LoginForm;
