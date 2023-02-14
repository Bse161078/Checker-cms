import { Space, Table } from "antd";
import React from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";

const ConverstionRates = () => {
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
      title: "Name",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Room Cleaned",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Extra",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mistakes",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      dataIndex: "profile",
      key: "profile",
      render: (_, record) => (
        <Space size="middle">
          <a>View Profile</a>
        </Space>
      ),
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <p className="font-bold text-lg">Conversation Rates</p>
      <br />
      <br />
      <div class="container mx-auto " style={{ width: "80%" }}>
        <Table className="w-full" dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default ConverstionRates;
