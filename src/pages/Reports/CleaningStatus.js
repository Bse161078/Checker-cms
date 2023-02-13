import { Progress, Space, Table } from "antd";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const CleaningStatus = () => {
  const navigate = useNavigate();
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
      title: "Cleaners",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Extra",
      dataIndex: "address",
      key: "address",
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
    <div>
      <div className="flex flex-col justify-center items-center w-full">
        <Navigation />
        <Toaster position="top-center" reverseOrder={true} />
        <div class="container mx-auto" style={{ width: "80%" }}>
          <br />

          <p className="text-lg font-bold">Rooms: Cleaning Status</p>
          <br />

          <div class="flex flex-wrap -mx-1">
            <div
              class="w-full md:w-1/3 px-2"
              onClick={() => navigate("/CleanersUsed")}
            >
              <div class="bgCard p-4">
                <div className=" text-lg font-bold ">
                  <div>In Progress </div>
                  <br />

                  <Progress
                    percent={30}
                    size="large"
                    className="blackProgress"
                    style={{ height: "40px" }}
                  />
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
              <div
                class="bgCard p-4"
                onClick={() => {
                  navigate("/roomCleaned");
                }}
              >
                <div className=" text-lg font-bold ">
                  <div style={{ minWidth: "170px" }}>Cleaned </div>
                  <br />

                  <Progress
                    percent={30}
                    size="large"
                    className="greenProgress"
                    style={{ height: "40px" }}
                  />
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
              <div
                class="bgCard p-4"
                onClick={() => {
                  navigate("/conversationRates");
                }}
              >
                <div className=" text-lg font-bold ">
                  <div style={{ minWidth: "170px" }}>Not Cleaned </div>
                  <br />

                  <Progress
                    percent={30}
                    size="large"
                    className="redProgress"
                    style={{ height: "40px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <p className="text-lg font-bold">In Progress</p>

          <br />

          <Table className="w-full" dataSource={dataSource} columns={columns} />
          <br />
          <p className="text-lg text-green-500 font-bold">Cleaned</p>
          <br />
          <Table className="w-full" dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default CleaningStatus;
