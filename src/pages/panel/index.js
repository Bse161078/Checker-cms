/* eslint-disable no-restricted-globals */
import { Button, Input, Modal, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../constants";
import { Toaster, toast } from "react-hot-toast";
import Navigation from "../../components/Navigation";

const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoomTypeModalOpen, setIsRoomTypeModalOpen] = useState(false);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [roomType, setRoomType] = useState();
  const [Level, setLevel] = useState();
  const [RoomName, setRoomName] = useState();
  const [RoomNameDe, setRoomNameDe] = useState();
  const [RoomTypeName, setRoomTypeName] = useState();
  const [RoomTypeNameDe, setRoomTypeNameDe] = useState();
  const [RoomTypes, SetRoomType] = useState();
  const [CleanerSalary, setCleanerSalary] = useState(0);
  const [Levels, setLevels] = useState();

  const handleChange = (value) => {
    SetRoomType(value);
    console.log(roomType, "roomtype");
  };

  const handleChanges = (value) => {
    setLevels(value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          <Tag color={"purple"}>{status || ""}</Tag>
        </>
      ),
    },
    {
      title: "Level",
      key: "level",
      dataIndex: "level",
      render: (_, { level }) => (
        <>
          <Tag color={"blue"}>{level?.title}</Tag>
        </>
      ),
    },
    {
      title: "Room Type",
      key: "roomType",
      dataIndex: "roomType",
      render: (_, { roomType }) => (
        <>
          <Tag color={"green"}>{roomType?.title}</Tag>
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
            </button>
            <button
              className="bg-yellow-100 text-yellow-500 px-2 py-2 rounded-md"
              onClick={() => {
                setIsReceptionModalOpen(true)
              }}
            >
              Create Reception
            </button> */}
        </Space>
      ),
    },
  ];

  const column = [
    {
      title: "Name",
      dataIndex: "title",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "German Name",
      dataIndex: "title_de",
      key: "name",
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
              handleDeletes(_id);
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
            </button>
            <button
              className="bg-yellow-100 text-yellow-500 px-2 py-2 rounded-md"
              onClick={() => {
                setIsReceptionModalOpen(true)
              }}
            >
              Create Reception
            </button> */}
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`${BASEURL}/room/${id}`, {
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

  const handleDeletes = (id) => {
    axios
      .delete(`${BASEURL}/room-type/${id}`, {
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

  const CreateRoom = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/room`,
        {
          roomType: RoomTypes,
          name: RoomName,
          name_de: RoomNameDe,
          level: Levels,
          hotel: localStorage.getItem("HotelID"),
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
        console.log("error", err);
        toast.error(err?.message);
        setLoading(false);
      });
  };

  const CreateRoomType = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/room-type`,
        {
          title: RoomTypeName,
          title_de: RoomTypeNameDe,
          price: CleanerSalary,
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

  useEffect(() => {
    getrooms();
    getRoomType();
    getLevel();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancels = () => {
    setIsRoomTypeModalOpen(false);
  };

  const getrooms = () => {
    axios
      .get(`${BASEURL}/room`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data?.rooms);
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

  const getLevel = () => {
    axios
      .get(`${BASEURL}/level`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setLevel(response?.data?.data?.levels);
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
          <h2 className="text-2xl text-black font-medium">Rooms List</h2>
          <div className="flex justify-center items-center gap-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
            >
              Create Room
            </button>
          </div>
        </div>
        <Table className="w-full" dataSource={users} columns={columns} />
      </section>
      <section
        style={{ width: "1200px" }}
        className="flex flex-col justify-start items-start my-10 gap-y-4"
      >
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl text-black font-medium">Rooms List</h2>
          <div className="flex justify-center items-center gap-x-4">
            <button
              onClick={() => setIsRoomTypeModalOpen(true)}
              className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
            >
              Create Room Type
            </button>
          </div>
        </div>
        <Table className="w-full" dataSource={roomType} columns={column} />
      </section>
      <Modal
        title="Create Room "
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
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Select Level
            </label>
            <Select
              defaultValue="select"
              style={{ width: 120 }}
              onChange={handleChanges}
              options={Level?.map((item) => {
                return { value: item?._id, label: item?.title };
              })}
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Create Room Type"
        open={isRoomTypeModalOpen}
        onCancel={handleCancels}
        footer={[
          <Button key="back" onClick={handleCancels}>
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateRoomType}
          >
            Create
          </Button>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Room Type Name
            </label>
            <Input
              onChange={(e) => {
                setRoomTypeName(e.target.value);
              }}
              placeholder="103"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Room Type Name Germany
            </label>
            <Input
              onChange={(e) => {
                setRoomTypeNameDe(e.target.value);
              }}
              placeholder="(optional)"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Cleaning Price Per Room
            </label>
            <Input
              onChange={(e) => {
                setCleanerSalary(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Rooms;
