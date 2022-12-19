/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Button, Input, Select } from "antd";
import axios from "axios";
import { BASEURL } from "../../constants";
import Navigation from "../Navigation";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "role",
      render: (_, { role }) => (
        <>
          <Tag color={"blue"}>{role}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, {_id}) => (
        <Space>
          <button className="bg-red-100 text-red-500 px-2 py-2 rounded-md" onClick={() => {
            handleDelete(_id)
          }}>Delete</button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    axios
    .delete(`${BASEURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((response) => {
      toast("delete successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      window.setTimeout(function () {
        location.reload();
      }, 1500);
    })
    .catch(function (error) {
      console.log(error);
      toast.error(error.response.data.errors.title);
    });
  }

  const Token = localStorage.getItem("Token");

  const handleChange = (value) => {
    setRole(value);
  };

  const CreateUserHandler = () => {
    setLoading(true);
    axios
      .post(`${BASEURL}/user`, {
        fullname: fullName,
        username: username,
        password: password,
        role: role,
        email: email,
        mobile: phone,
      }, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        toast("Created Successfully!", {
          icon: "👏",
          style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
          },
        });
        setLoading(false);
        setIsModalOpen(false);
        window.setTimeout(function () {
          location.reload();
        }, 1500);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getUsers = () => {
    axios
      .get(`${BASEURL}/user`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <section
        style={{ width: "1200px" }}
        className="flex flex-col justify-start items-start my-10 gap-y-4"
      >
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl text-black font-medium">User List</h2>
          <button
            onClick={showModal}
            className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
          >
            Create User
          </button>
        </div>
        <Table className="w-full" dataSource={users} columns={columns} />
      </section>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateUserHandler}
          >
            Create
          </Button>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Full Name</label>
            <Input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              placeholder="jack grilish"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">User Name</label>
            <Input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="thisisjack"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Password</label>
            <Input.Password
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Email</label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="sample@gmail.com"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Role</label>
            <Select
              defaultValue="select"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "HotelAdmin",
                  label: "Hotel Admin",
                },
                {
                  value: "CompanyAdmin",
                  label: "Company Admin",
                },
              ]}
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Phone</label>
            <Input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="+41503243232"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
