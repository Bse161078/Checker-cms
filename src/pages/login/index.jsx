import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Logo from "../../image/checkerdark.png";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { BASEURL } from "../../constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate()

  const LoginHandler = (values) => {
    axios
      .post(`${BASEURL}/auth/login`, {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("Token", res?.data?.data?.loginResult?.accessToken);
        localStorage.setItem("Role", res?.data?.data?.loginResult?.role);
        toast("Login Successfull!", {
          icon: "👏",
          style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
          },
        });
        if (res?.data?.data?.loginResult?.role === 'SuperAdmin') {
          navigate('/')
        } else if (res?.data?.data?.loginResult?.role === 'HotelAdmin') {
          navigate('/levels')
        } else if (res?.data?.data?.loginResult?.role === 'CompanyAdmin') {
          navigate('/levels')
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.message);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="flex flex-col justify-center items-center px-4 py-3 border-2 border-gray-100 rounded-lg bg-white gap-y-6">
        <img width={150} src={Logo} alt="" />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={LoginHandler}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <button
              className="bg-blue-400 text-white w-1/2 py-2"
              htmlType="submit"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
