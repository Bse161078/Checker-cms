/* eslint-disable no-restricted-globals */
import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../constants";
import { Toaster, toast } from "react-hot-toast";
import Navigation from "../../components/Navigation";

const HotelsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCleanerModalOpen, setIsCleanerModalOpen] = useState(false);
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [hotelID, setHotelID] = useState();
  const [fullName, setFullName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [CleanerFullName, setCleanerFullName] = useState();
  const [CleanerUsername, setCleanerUserName] = useState();
  const [img, setImg] = useState();
  const [RoomTypeNameDe, setRoomTypeNameDe] = useState();
  const [RoomTypeName, setRoomTypeName] = useState();
  const [RoomTypes, setRoomType] = useState();
  // const [RoomTypes, SetRoomType] = useState();

  const [CleanerPassword, setCleanerPassword] = useState();
  const [CleanerSalary, setCleanerSalary] = useState();
  const [CleanerRoomCount, setCleanerRoomCountForClean] = useState();
  const [ReceptionFullName, setReception] = useState();
  const [ReceptionUsername, setReceptionUserName] = useState();
  const [ReceptionPassword, setReceptionPassword] = useState();
  const [roomName, setRoomName] = useState();
  const [roomName_de, setRoomName_de] = useState();
  const [roomLevel, setRoomLevel] = useState();
  const [Level, setLevel] = useState();
  const [Levels, setLevels] = useState();
  const [roomType, SetRoomType] = useState();

  const handleChange = (value) => {
    SetRoomType(value);
    console.log(roomType, "roomtype");
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
  const columns = [
    {
      title: "Hotel/Cleaning Company Name",
      dataIndex: "fullname",
      key: "username",
      render: (text) => <a>{text?text:"NA"}</a>,
    },
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
          {console.log(_, "sds")}
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
              setHotelID(_id);
              setIsCleanerModalOpen(true);
            }}
          >
            Create Cleaner
          </button>
          <button
            className="bg-yellow-100 text-yellow-500 px-2 py-2 rounded-md"
            onClick={() => {
              setIsReceptionModalOpen(true);
            }}
          >
            Create Reception
          </button> */}
          {/* <button
            style={{ backgroundColor: "rgb(226 204 181)", color: "#964B00" }}
            className="   px-2 py-2 rounded-md"
            onClick={() => {
              setIsRoomModalOpen(true);
              setHotelID(_id);
            }}
          >
            Create Room
          </button> */}
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`${BASEURL}/hotel/${id}`, {
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
        toast.error(error.response.data.errors.title);
      });
  };

  const Token = localStorage.getItem("Token");

  const CreateChecker = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", fullName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", img);
    formData.append("hotelID", hotelID);

    axios
      .post(`${BASEURL}/hotel/create-hotel-checker`, formData, {
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
        toast.error(err?.response?.data?.errors?.message?err.response.data.errors.message:err.response.data.errors.title);
        setLoading(false);
      });
  };

  const CreateCleaner = () => {
    setLoading(true);
    const fromData = new FormData();
    const formData = new FormData();
    formData.append("fullname", CleanerFullName);
    formData.append("username", CleanerUsername);
    formData.append("password", CleanerPassword);
    formData.append("avatar", img);
    formData.append("roomCountForCleanEachDay", CleanerRoomCount);
    formData.append("hotelID", hotelID);
    //formData.append("salaryPerRoom", 88);

    axios
      .post(`${BASEURL}/hotel/create-hotel-cleaner`, formData, {
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
        toast.error(err?.response?.data?.errors?.message?err.response.data.errors.message:err.response.data.errors.title);
        setLoading(false);
      });
  };
  const handleChanges = (value) => {
    setLevels(value);
  };

  const CreateRoom = () => {
    setLoading(true);

    axios
      .post(
        `${BASEURL}/room`,
        {
          roomType: RoomTypeName,
          name: roomName,
          name_de: roomName_de,
          level: roomLevel,
          // hotel: hotelID,
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
        toast.error(err?.response?.data?.errors?.message?err.response.data.errors.message:err.response.data.errors.title);
        setLoading(false);
      });
  };

  const CreateReception = () => {
    setLoading(true);

    axios
      .post(
        `${BASEURL}/hotel/create-hotel-reception`,
        {
          fullname: ReceptionFullName,
          username: ReceptionUsername,
          password: ReceptionPassword,
          // hotel: hotelID,
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
        console.log("eror",err)
        toast.error(err?.response?.data?.errors?.message?err.response.data.errors.message:err.response.data.errors.title);
        setLoading(false);
      });
  };
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setImg(e.target.files[0]);
    }
    console.log(img, "Img");
  };
  useEffect(() => {
    getHotels();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getHotels = () => {
    axios
      .get(`${BASEURL}/hotel`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log('users',response?.data?.data?.hotels)
        setUsers(response?.data?.data?.hotels);
      });
  };

  useEffect(() => {
    // getrooms();
    getLevel();
    getRoomType();
  }, []);
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
          <h2 className="text-2xl text-black font-medium">Hotel List</h2>
          {/* <button
              onClick={showModal}
              className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
            >
              Create User
            </button> */}
        </div>
        <Table className="w-full" dataSource={users} columns={columns} />
      </section>
      <Modal
        title="Create Checker "
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
            <label className="w-full text-left font-semibold">
              Checker Avatar
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
        title="Create Cleaner "
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
          {/* <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Cleaning Price Per Room
            </label>
            <Input
              type="number"
              min={1}
              defaultValue={1}
              onChange={(e) => {
                debugger;
                setCleanerSalary(e.target.value);
              }}
            />
          </div> */}
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Rooms He Should Clean Per Day
            </label>
            <Input
              type="number"
              min={1}
              defaultValue={1}
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
        title="Create Reception"
        open={isReceptionModalOpen}
        onCancel={() => {
          setIsReceptionModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsReceptionModalOpen(false);
            }}
          >
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateReception}
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
                setReception(e.target.value);
              }}
              placeholder="jack grilish"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">User Name</label>
            <Input
              onChange={(e) => {
                setReceptionUserName(e.target.value);
              }}
              placeholder="thisisjack"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Password</label>
            <Input.Password
              onChange={(e) => {
                setReceptionPassword(e.target.value);
              }}
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Create Room "
        open={isRoomModalOpen}
        onCancel={() => {
          setIsRoomModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsRoomModalOpen(false);
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
            <label className="w-full text-left font-semibold">Room Name</label>
            <Input
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              placeholder="thisisjack"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Room Name Germany
            </label>
            <Input
              onChange={(e) => {
                setRoomName_de(e.target.value);
              }}
              placeholder="input "
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Room Level</label>
            <Input
              onChange={(e) => {
                setRoomLevel(e.target.value);
              }}
              placeholder="input "
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
    </div>
  );
};

export default HotelsList;
