import { Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { BASEURL } from "../../constants";

const RoomCleaned = () => {
  const [cleaner, setCleaner] = useState();
  const Token = localStorage.getItem("Token");
  const getReports = () => {
    axios
      .get(`${BASEURL}/room/report`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setCleaner(response.data.data);
        // setLevel(response?.data?.data?.levels);
      });
  };

  useEffect(() => {
    getReports();
  }, []);
  const filteredRooms = cleaner?.cleanersReport?.reduce((acc, obj) => {
    obj.rooms.forEach((room) => {
      if (room.cleaning_status === "CLEANED") {
        acc.push(room);
      }
    });
    return acc;
  }, []);
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

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <p className="font-bold text-lg">Rooms Cleaned</p>
      <br />
      <br />
      <div class="container mx-auto " style={{ width: "80%" }}>
        <Table
          className="w-full"
          dataSource={filteredRooms}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default RoomCleaned;
