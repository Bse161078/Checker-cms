/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Modal,
  Button,
  Input,
} from "antd";
import axios from "axios";
import { BASEURL } from "../../constants";
import Navigation from "../../components/Navigation";
import { Toaster, toast } from "react-hot-toast";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Cleaners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCleanerModalOpen, setIsCleanerModalOpen] = useState(false);
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [hotelID, setHotelID] = useState();
  const [CleanerFullName, setCleanerFullName] = useState();
  const [CleanerUsername, setCleanerUserName] = useState();
  const [CleanerPassword, setCleanerPassword] = useState();
  const [CleanerSalary, setCleanerSalary] = useState(0);
  const [CleanerRoomCount, setCleanerRoomCountForClean] = useState(0);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Salary Per Room",
      dataIndex: "salaryPerRoom",
      key: "salaryPerRoom ",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Rooms To Clean Per Day",
      key: "tags",
      dataIndex: "roomCountForCleanEachDay ",
      render: (_, { roomCountForCleanEachDay }) => (
        <>
          <Tag color={"blue"}>{roomCountForCleanEachDay}</Tag>
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
      .delete(`${BASEURL}/cleaner/${id}`, {
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

  const CreateCleaner = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/cleaner`,
        {
          fullname: CleanerFullName,
          username: CleanerUsername,
          password: CleanerPassword,
          salaryPerRoom: CleanerSalary,
          roomCountForCleanEachDay: CleanerRoomCount,
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

  useEffect(() => {
    getCleaners();
  }, []);

  const getCleaners = () => {
    axios
      .get(`${BASEURL}/cleaner`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data?.cleaners);
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
          <h2 className="text-2xl text-black font-medium">Cleaners List</h2>
          <button
            onClick={() => {
              setIsCleanerModalOpen(true);
            }}
            className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
          >
            Create Cleaner
          </button>
        </div>
        <Table className="w-full" dataSource={users} columns={columns} />
      </section>
      <Modal
        title="Create Cleaner"
        open={isCleanerModalOpen}
        onCancel={() => {
          setIsCleanerModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsCleanerModalOpen(false);
            }}
          >
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateCleaner}
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
                setCleanerFullName(e.target.value);
              }}
              placeholder="jack grilish"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">User Name</label>
            <Input
              onChange={(e) => {
                setCleanerUserName(e.target.value);
              }}
              placeholder="thisisjack"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Password</label>
            <Input.Password
              onChange={(e) => {
                setCleanerPassword(e.target.value);
              }}
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Salary Per Room
            </label>
            <Input
              onChange={(e) => {
                setCleanerSalary(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Rooms He Should Clean Per Day
            </label>
            <Input
              onChange={(e) => {
                setCleanerRoomCountForClean(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cleaners;
