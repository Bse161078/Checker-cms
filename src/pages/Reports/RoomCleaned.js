import { Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { BASEURL } from "../../constants";

const RoomCleaned = () => {
  const [cleaner, setCleaner] = useState();
  const Token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const getReports = () => {
    axios
      .get(`${BASEURL}/room/report`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCleaner(response.data.data);
        // setLevel(response?.data?.data?.levels);
      });
  };

  useEffect(() => {
    getReports();
  }, []);
  const filteredRooms = cleaner?.roomsReport?.reduce((acc, obj) => {
    if (acc.cleaning_status === "CLEANED" || "Cleaned") {
      acc.push(obj);
    }
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
      render: (_, i, ind) => {
        return (
          <ul>
            <li>{i?.name}</li>
          </ul>
        );
      },
    },
    {
      title: "Room Cleaners",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        return (
          <ul>
            {i?.cleaners?.map((el, ind) => (
              <span>
                {el?.fullname}
                {i?.cleaners.length - 1 !== ind ? "," : null}{" "}
              </span>
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
        return (
          <span
            onClick={() =>
              navigate(`/room-details`, { state: { cleanerRecord: i } })
            }
          >
            Room Details
          </span>
        );
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
