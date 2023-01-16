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
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [CompanyfullName, setCompanyFullName] = useState();
  const [Companyusername, setCompanyUserName] = useState();
  const [Companypassword, setCompanyPassword] = useState();
  const [Companyemail, setCompanyEmail] = useState();
  const navigate = useNavigate();
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
      render: (_, { _id }) => (
        <Space>
          <button
            className="bg-red-100 text-red-500 px-2 py-2 rounded-md"
            onClick={() => {
              handleDelete(_id);
            }}
          >
            Delete
          </button>
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
  };

  const Token = localStorage.getItem("Token");

  const CreateHotelUserHandler = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/hotel`,
        {
          fullname: fullName,
          username: username,
          password: password,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
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

  const CreateCompanyUserHandler = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/company`,
        {
          fullname: CompanyfullName,
          username: Companyusername,
          password: Companypassword,
          email: Companyemail,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
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
        setIsCompanyModalOpen(false);
        window.setTimeout(function () {
          location.reload();
        }, 1500);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error?.message);
        setLoading(false);
      });
  };

  const IsImLoggedIn = () => {
    axios
      .get(`${BASEURL}/auth/check-login`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        if (response?.data?.statusCode === 200 || 201) {
          navigate('/')
        } else {
          navigate('/login')
        }
      }).catch((err) => {
        navigate('/login')
      });
  };

  useEffect(() => {
    IsImLoggedIn()
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
          <div className="flex justify-center items-center gap-x-4">
            <button
              onClick={showModal}
              className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
            >
              Create Hotel
            </button>
            <button
              onClick={() => {
                setIsCompanyModalOpen(true);
              }}
              className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
            >
              Create Company
            </button>
          </div>
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
            onClick={CreateHotelUserHandler}
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
        </div>
      </Modal>
      <Modal
        title="Create Company"
        open={isCompanyModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsCompanyModalOpen(false)
        }}
        footer={[
          <Button key="back" onClick={() => {
            setIsCompanyModalOpen(false)
          }}>
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateCompanyUserHandler}
          >
            Create
          </Button>,
        ]}
      >
        {/* <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Full Name</label>
            <Input
              onChange={(e) => {
                setCompanyFullName(e.target.value);
              }}
              placeholder="jack grilish"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">User Name</label>
            <Input
              onChange={(e) => {
                setCompanyUserName(e.target.value);
              }}
              placeholder="thisisjack"
<<<<<<< HEAD
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Password</label>
            <Input.Password
              onChange={(e) => {
                setCompanyPassword(e.target.value);
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
                setCompanyEmail(e.target.value);
              }}
              placeholder="sample@gmail.com"
=======
>>>>>>> parent of 0a0a772 (feat: add titles and some pages done)
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Password</label>
            <Input.Password
              onChange={(e) => {
                setCompanyPassword(e.target.value);
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
                setCompanyEmail(e.target.value);
              }}
              placeholder="sample@gmail.com"
            />
          </div>
        </div> */}
      </Modal>
    </div>
  );
};

export default Home;
