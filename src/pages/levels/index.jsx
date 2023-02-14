/* eslint-disable no-restricted-globals */
import { Button, Input, Modal, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../constants";
import { Toaster, toast } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { useNavigate } from "react-router-dom";

const Levels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [roomType, setRoomType] = useState();
  const [Level, setLevel] = useState();
  const [RoomName, setRoomName] = useState();
  const [LevelName, setLevelName] = useState();
  const [RoomNameDe, setRoomNameDe] = useState();
  const [RoomTypes, SetRoomType] = useState();
  const [Levels, setLevels] = useState();

  const handleChange = (value) => {
    SetRoomType(value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
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
          {/* <button
                className="bg-green-100 text-green-500 px-2 py-2 rounded-md"
                onClick={() => {
                  setIsModalOpen(true);
                  setHotelID(_id);
                }}
              >
                Create Checker
              </button>
              <button
                className="bg-blue-100 text-blue-500 px-2 py-2 rounded-md"
                onClick={() => {
                  setIsCleanerModalOpen(true);
                }}
              >
                Create Cleaner
              </button>*/}
          <button
            className="bg-blue-100 text-blue-500 px-2 py-2 rounded-md"
            onClick={() => {
              setAddRoomModalOpen(true);
              setLevel(_id);
            }}
          >
            Create Room
          </button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`${BASEURL}/level/${id}`, {
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

  const CreateLevel = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/level`,
        {
          title: LevelName,
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
        toast.error(err?.message);
        setLoading(false);
      });
  };

  const CreateRoom = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/room`,
        {
          roomType: RoomTypes,
          name: RoomName,
          name_de: RoomNameDe,
          level: Level,
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
        setAddRoomModalOpen(false);
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
    getrooms();
    getRoomType();
    IsImLoggedIn();
  }, []);

  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getrooms = () => {
    axios
      .get(`${BASEURL}/level`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data?.levels);
      });
  };

  const getRoomType = () => {
    axios
      .get(`${BASEURL}/room-type`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setRoomType(response?.data?.data?.roomTypes);
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
          navigate("/levels");
          localStorage.setItem("HotelID", response?.data?.data?.user?._id);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
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
          <h2 className="text-2xl text-black font-medium">Levels List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
          >
            Create Level
          </button>
        </div>
        <Table className="w-full" dataSource={users} columns={columns} />
      </section>
      <Modal
        title="Create Level"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateLevel}
          >
            Create
          </Button>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Level Name</label>
            <Input
              onChange={(e) => {
                setLevelName(e.target.value);
              }}
              placeholder="103"
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Create Room"
        open={addRoomModalOpen}
        onCancel={() => {
          setAddRoomModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setAddRoomModalOpen(false);
            }}
          >
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateRoom}
          >
            Create
          </Button>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Room Name</label>
            <Input
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              placeholder="103"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Room Name Germany
            </label>
            <Input
              onChange={(e) => {
                setRoomNameDe(e.target.value);
              }}
              placeholder="(optional)"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Select Room Type
            </label>
            <Select
              defaultValue="select"
              style={{ width: 120 }}
              onChange={handleChange}
              options={roomType?.map((item) => {
                return { value: item?._id, label: item?.title };
              })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Levels;
