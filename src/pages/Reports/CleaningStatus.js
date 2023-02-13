import { Progress, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { BASEURL } from "../../constants";

const CleaningStatus = () => {
  const Token = localStorage.getItem("Token");
  const [cleaner, setCleaner] = useState();

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
      render: (_, i, ind) => {
        return <span>{ind}</span>;
      },
    },

    {
      title: "Room Number",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room Cleaners",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        console.log(i, "sd");
        return (
          <ul>
            {i?.rooms?.map((el) => (
              <li>{el?.name}</li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Room Details",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        console.log(i, "sd");
        return <a href="">Room Details</a>;
      },
    },
  ];
  const filteredRoomsInprogress = cleaner?.cleanersReport?.reduce(
    (acc, obj) => {
      obj.rooms.forEach((room) => {
        if (room.cleaning_status === "IN_PROGRESS") {
          acc.push(room);
        }
      });
      return acc;
    },
    []
  );
  const filteredRoomsCLEANED = cleaner?.cleanersReport?.reduce((acc, obj) => {
    obj.rooms.forEach((room) => {
      if (room.cleaning_status === "CLEANED") {
        acc.push(room);
      }
    });
    return acc;
  }, []);
  const getReports = () => {
    axios
      .get(`${BASEURL}/room/report`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log({ response });
        setCleaner(response.data.data);
        // setLevel(response?.data?.data?.levels);
      });
  };
  useEffect(() => {
    getReports();
  }, []);
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
                    percent={cleaner?.roomsInProgress}
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
                    percent={cleaner?.roomsCleaned}
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
                    percent={cleaner?.roomsNotCleaned}
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

          <Table
            className="w-full"
            dataSource={filteredRoomsInprogress}
            columns={columns}
          />
          <br />
          <p className="text-lg text-green-500 font-bold">Cleaned</p>
          <br />
          <Table
            className="w-full"
            dataSource={filteredRoomsCLEANED}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default CleaningStatus;
