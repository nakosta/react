import React from "react";
import { Form, Input, InputNumber, Button, Radio, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.module.css";
import { useRegisterUserMutation } from "../../tasksApi";

const { Title } = Typography;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegistration = async (values) => {
    try {
      await registerUser(values).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Form form={form} layout="vertical" onFinish={handleRegistration}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

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

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[
            { required: true, message: "Please input your age!" },
            {
              type: "number",
              min: 1,
              max: 120,
              message: "Please enter a valid age!",
            },
          ]}
        >
          <InputNumber
            className={styles.inputNumber}
            placeholder="Enter your age"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <Title level={5} className={styles.title}>
        Already have an account? <Link to="/login">Log In!</Link>
      </Title>
    </div>
  );
};

export default RegistrationForm;
