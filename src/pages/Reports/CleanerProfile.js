import { Avatar, Space, Table } from "antd";
import React from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
const CleanerProfile = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room Number",
      dataIndex: "age",
      key: "age",
    },

    {
      title: "",
      dataIndex: "profile",
      key: "profile",
      render: (_, record) => (
        <Space size="middle">
          <a>Room Details</a>
        </Space>
      ),
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <div className="div" style={{ width: "80%" }}>
        <div style={{ textAlign: "center" }}>
          <Avatar size={"large"} />
          <p className="text-md font-bold">Hamzah Larson</p>
          <p className="text-md font-bold">
            <MailOutlined style={{ color: "#0BBBEF" }} /> hamzah@checker.com{" "}
            <PhoneOutlined style={{ color: "#0BBBEF" }} /> +971 55 9994444
          </p>
        </div>
        <br />

        <div class="flex flex-wrap -mx-1 w-full">
          <div class="w-full md:w-1/3 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div style={{ color: "#0BBBEF" }}>Room Cleaned</div>
                <br />

                <p className="text-lg">12</p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div style={{ color: "#0BBBEF" }}>Extras</div>
                <br />

                <p className="text-lg">12</p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div style={{ color: "#0BBBEF" }}>Mistakes</div>
                <br />

                <p className="text-lg">12</p>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div class="flex flex-wrap -mx-1">
          <div class="w-full md:w-1/2 px-2">
            <p className="text-md font-bold">Rooms Cleaned</p>
            <br />

            <Table
              className="w-full"
              dataSource={dataSource}
              columns={columns}
            />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <p className="text-md font-bold">Extra Beds</p>
            <br />

            <Table
              className="w-full"
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanerProfile;
