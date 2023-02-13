/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Button, Input } from "antd";
import axios from "axios";
import { BASEURL } from "../../constants";
import Navigation from "../../components/Navigation";
import { Toaster, toast } from "react-hot-toast";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Cleaners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCleanerModalOpen, setIsCleanerModalOpen] = useState(false);
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);
  const [users, setUsers] = useState();
  const [cleaner, setCleaner] = useState();
  const [loading, setLoading] = useState(false);
  const [hotelID, setHotelID] = useState();
  const [CleanerFullName, setCleanerFullName] = useState();
  const [CleanerUsername, setCleanerUserName] = useState();
  const [SalaryPerRoom, setSalaryPerRoom] = useState();

  const [CleanerPassword, setCleanerPassword] = useState();
  const [CleanerRoomCount, setCleanerRoomCountForClean] = useState(0);
  const [img, setImg] = useState();

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
          <button
            className="bg-green-100 text-green-500 px-2 py-2 rounded-md"
            onClick={() => {
              setIsDescModalOpen(true);
              getCleanerById(_id);
            }}
          >
            Report
          </button>
        </Space>
      ),
    },
  ];
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setImg(e.target.files[0]);
    }
    console.log(img, "Img");
  };
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
    debugger;
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", CleanerFullName);
    formData.append("username", CleanerUsername);
    formData.append("password", CleanerPassword);
    formData.append("avatar", img);
    formData.append("roomCountForCleanEachDay", CleanerRoomCount);
    formData.append("salaryPerRoom", SalaryPerRoom);

    axios
      .post(`${BASEURL}/cleaner`, formData, {
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
        toast.error(err?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCleaners();
  }, []);

  const getCleaners = async () => {
    await axios
      .get(`${BASEURL}/cleaner`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data?.cleaners);
      });
  };

  const getCleanerById = (id) => {
    axios
      .get(`${BASEURL}/cleaner/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setCleaner(response?.data?.data?.cleaner);
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
              placeholder="User Name"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Cleaning Price per Room
            </label>
            <Input
              onChange={(e) => {
                setSalaryPerRoom(e.target.value);
              }}
              placeholder="Cleaning Price"
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
              Rooms He Should Clean Per Day
            </label>
            <Input
              onChange={(e) => {
                setCleanerRoomCountForClean(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Cleaner Avatar
            </label>
            <Input
              type="file"
              onChange={(e) => {
                imgFilehandler(e);
              }}
              placeholder="103"
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Cleaner Report"
        open={isDescModalOpen}
        onCancel={() => {
          setIsDescModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsDescModalOpen(false);
            }}
          >
            Return
          </Button>,
        ]}
      >
        <div className="grid grid-cols-2 gap-y-10 w-full my-10">
          <div className="flex justify-start items-start gap-x-3">
            <h3 className="text-lg font-medium">Full Name :</h3>
            <p className="text-gray-500 text-lg">{cleaner?.fullname}</p>
          </div>
          <div className="flex justify-start items-start gap-x-3">
            <h3 className="text-lg font-medium">Bill :</h3>
            <p className="text-gray-500 text-lg">{cleaner?.billAmount}</p>
          </div>
          <div className="flex justify-start items-start gap-x-3">
            <h3 className="text-lg font-medium">Room Not Cleaned :</h3>
            <p className="text-gray-500 text-lg">
              {cleaner?.roomNotCleanedCount}
            </p>
          </div>
          <div className="flex justify-start items-start gap-x-3">
            <h3 className="text-lg font-medium">Room Cleaned :</h3>
            <p className="text-gray-500 text-lg">{cleaner?.roomCleanedCount}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cleaners;
