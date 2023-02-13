/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Button, Input } from "antd";
import axios from "axios";
import { BASEURL } from "../../constants";
import Navigation from "../../components/Navigation";
import { Toaster, toast } from "react-hot-toast";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const MyCheckers = () => {
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
      .delete(`${BASEURL}/checker/${id}`, {
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

  const CreateChecker = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", CleanerFullName);
    formData.append("username", CleanerUsername);
    formData.append("password", CleanerPassword);
    formData.append("avatar", img);
    // formData.append("hotelID", localStorage.getItem("hotelID"));

    // formData.append("salaryPerRoom", CleanerSalary);
    // formData.append("roomCountForCleanEachDay", CleanerRoomCount);

    axios
      .post(`${BASEURL}/checker`, formData, {
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
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setImg(e.target.files[0]);
    }
    console.log(img, "Img");
  };
  const getCleaners = () => {
    setLoading(true);
    axios
      .get(`${BASEURL}/checker`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data?.checkers);
      });
    setLoading(false);
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
          <h2 className="text-2xl text-black font-medium">Checkers List</h2>
          <button
            onClick={() => {
              setIsCleanerModalOpen(true);
            }}
            className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
          >
            Create Checkers
          </button>
        </div>
        <Table
          className="w-full"
          dataSource={users}
          columns={columns}
          loading={loading}
        />
      </section>
      <Modal
        title="Create Checker "
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
            onClick={CreateChecker}
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
              minLength={4}
              onChange={(e) => {
                setCleanerUserName(e.target.value);
              }}
              placeholder="thisisjack"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Password</label>
            <Input.Password
              minLength={6}
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
    </div>
  );
};

export default MyCheckers;
