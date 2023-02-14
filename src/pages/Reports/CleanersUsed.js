import { Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { BASEURL } from "../../constants";

const CleanersUsed = () => {
  const [cleaner, setCleaner] = useState();

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
  const Token = localStorage.getItem("Token");

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
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, i, ind) => {
        return <span>{i?.fullname}</span>;
      },
    },
    {
      title: "Room Number",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        console.log(i, "sd");
        return (
          <ul>
            {i?.rooms?.map((el, ind) => (
              <span>
                {el?.name}
                {i?.rooms.length - 1 !== ind ? "," : null}{" "}
              </span>
            ))}
          </ul>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <p className="font-bold text-lg">Cleaners Used</p>
      <br />
      <br />
      <div class="container mx-auto " style={{ width: "80%" }}>
        <Table
          className="w-full"
          dataSource={cleaner?.cleanersReport}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default CleanersUsed;
