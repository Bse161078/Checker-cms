/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Button, Input, Select } from "antd";
import axios from "axios";
import { BASEURL } from "../../constants";
import Navigation from "../Navigation";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Tags } from "../../data/tag";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [additionalInfo, setAdditionalInfo] = useState();
  const [desc, setDesc] = useState();
  const [loading, setLoading] = useState(false);
  

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "type",
      key: "type",
      dataIndex: "type",
      render: (_, { type }) => (
        <>
          <Tag color={"blue"}>{type}</Tag>
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
      .delete(`${BASEURL}/package/${id}`, {
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

  const CreatePackage = () => {
    setLoading(true);
    axios
      .post(`${BASEURL}/package`, {
        body: {
          
        }
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

  // const CreateCompanyUserHandler = () => {
  //   setLoading(true);
  //   axios
  //     .post(
  //       `${BASEURL}/company`,
  //       {
  //         fullname: CompanyfullName,
  //         username: Companyusername,
  //         password: Companypassword,
  //         email: Companyemail,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       toast("Created Successfully!", {
  //         icon: "👏",
  //         style: {
  //           borderRadius: "4px",
  //           background: "#333",
  //           color: "#fff",
  //         },
  //       });
  //       setLoading(false);
  //       setIsCompanyModalOpen(false);
  //       window.setTimeout(function () {
  //         location.reload();
  //       }, 1500);
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.error?.message);
  //       setLoading(false);
  //     });
  // };

  const IsImLoggedIn = () => {
    axios
      .get(`${BASEURL}/auth/check-login`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        if (response?.data?.statusCode === 200 || 201) {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    IsImLoggedIn();
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
      .get(`${BASEURL}/package`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data?.packages);
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
          <h2 className="text-2xl text-black font-medium">Package List</h2>
          <div className="flex justify-center items-center gap-x-4">
            <button
              onClick={showModal}
              className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
            >
              Create Package
            </button>
          </div>
        </div>
        <Table className="w-full" dataSource={users} columns={columns} />
      </section>
      <Modal
        title="Create Package"
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
            onClick={CreatePackage}
          >
            Create
          </Button>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Title</label>
            <Input
              alt="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="example"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">type</label>
            <Select
              multiple
              style={{ width: 120 }}
              name="type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {Tags?.map((item) => {
                return <option value={item.value}>{item.name}</option>;
              })}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              description
            </label>
            <Input
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              name="description"
              placeholder="thisisjack"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Additional Info
            </label>
            <Input
              onChange={(e) => {
                set(e.target.value);
              }}
              name="additionalInfo"
              placeholder="example"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Tags</label>
            <Select
              multiple
              style={{ width: 120 }}
              name="tags"
              onChange={handleChange}
            >
              {Tags?.map((item) => {
                return <option value={item.value}>{item.name}</option>;
              })}
            </Select>
          </div>
        </div>
      </Modal>
      <Modal
        title="Create Company"
        open={isCompanyModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsCompanyModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsCompanyModalOpen(false);
            }}
          >
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            // onClick={CreateCompanyUserHandler}
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
