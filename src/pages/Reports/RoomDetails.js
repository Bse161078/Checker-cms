import { Avatar, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import axios from "axios";
import { BASEURL } from "../../constants";
import { useLocation } from "react-router-dom";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
const RoomDetails = () => {
  const [checkListData, setCheckListData] = useState(null);
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, row) => {
        return (
          <Space>
            <Avatar src={BASEURL + "/" + row.avatar} />
            {/* {row?.fullname} */}
          </Space>
        );
      },
    },
    {
      title: "No.",
      dataIndex: "name",
      key: "name",
      render: (_, row, ind) => {
        return <Space>{ind}</Space>;
      },
    },
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
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
  const { state } = useLocation();
  const { cleanerRecord } = state;
  const Token = localStorage.getItem("Token");
  const [cleaner, setCleaner] = useState();

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
  console.log(checkListData, "checkListData");

  useEffect(() => {
    cleaner?.cleanersReport?.forEach((report) => {
      const room = report?.rooms?.find((r) => r._id === cleanerRecord._id);
      if (room) {
        setCheckListData(room.mistakes);
      }
    });
  }, []);

  useEffect(() => {
    getReports();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <div className="div" style={{ width: "80%" }}>
        <div style={{ textAlign: "center" }}>
          {/* <Avatar size={"large"} /> */}
          <p className="text-md font-bold">Room No.</p>
          <p className="text-lg font-bold">{cleanerRecord.name}</p>
        </div>
        <br />

        <div class="flex flex-wrap -mx-1 w-full">
          <div class="w-full md:w-1/2 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div>Cleaning Status</div>
                <br />

                <p
                  className="text-xl "
                  style={{
                    color:
                      cleanerRecord.cleaning_status === "Damaged"
                        ? "red"
                        : "#27AE60",
                  }}
                >
                  {/* {cleanerRecord.cleaning_status.replace("_", " ")} */}
                  {cleanerRecord.cleaning_status === "Damaged"
                    ? "Damaged"
                    : cleanerRecord.cleaning_status.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div>Damages</div>
                <br />

                <p
                  className="text-xl "
                  style={{
                    color:
                      cleanerRecord.cleaning_status === "Damaged"
                        ? "red"
                        : "#27AE60",
                  }}
                >
                  {cleanerRecord.cleaning_status === "Damaged"
                    ? "Damaged"
                    : "No Damages"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />

        <p className="text-md font-bold">Cleaners Used</p>
        <br />

        <Table
          className="w-full"
          dataSource={cleanerRecord.cleaners}
          columns={columns}
        />
        <br />

        <p className="text-md font-bold">Checklist</p>
        <br />
        <div style={{ backgroundColor: "#fff", padding: "10" }}>
          {/* {checkListData?.roomIsNotVacuumed?.status && ( */}
          <div className="flex justify-between mt-4 ">
            <div className="flex gap-3" style={{ alignItems: "center" }}>
              <span
                style={{
                  background: checkListData?.roomIsNotVacuumed?.status
                    ? "#E8F5ED"
                    : "#FBECEC",
                  height: "40px",
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
                }}
              >
                {checkListData?.roomIsNotVacuumed?.status === true ? (
                  <LikeFilled style={{ color: "#27AE60" }} />
                ) : (
                  <DislikeFilled style={{ color: "#EB5757" }} />
                )}
              </span>
              <p className="font-bold"> Is the floor vacuumed?</p>
            </div>
            <img
              style={{ height: 40, width: 50, borderRadius: "6px" }}
              src=""
              alt="..."
            />
          </div>

          <div className="flex justify-between mt-4 ">
            <div className="flex gap-3" style={{ alignItems: "center" }}>
              <span
                style={{
                  background: checkListData?.roomIsNotVacuumed?.status
                    ? "#E8F5ED"
                    : "#FBECEC",

                  height: "40px",
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
                }}
              >
                {checkListData?.roomIsNotVacuumed?.status === true ? (
                  <LikeFilled style={{ color: "#27AE60" }} />
                ) : (
                  <DislikeFilled style={{ color: "#EB5757" }} />
                )}
              </span>
              <p className="font-bold">Is Damage Caused By Guests?</p>
            </div>
            <img
              style={{ height: 40, width: 50, borderRadius: "6px" }}
              src=""
              alt="..."
            />
          </div>
          <div className="flex justify-between mt-4 ">
            <div className="flex gap-3" style={{ alignItems: "center" }}>
              <span
                style={{
                  background: checkListData?.roomIsNotVacuumed?.status
                    ? "#E8F5ED"
                    : "#FBECEC",

                  height: "40px",
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
                }}
              >
                {checkListData?.roomIsNotVacuumed?.status === true ? (
                  <LikeFilled style={{ color: "#27AE60" }} />
                ) : (
                  <DislikeFilled style={{ color: "#EB5757" }} />
                )}
              </span>
              <p className="font-bold">
                {" "}
                Is Room Has Strong Stains That CanNot Be Cleaned By Us
              </p>
            </div>
            <img
              style={{ height: 40, width: 50, borderRadius: "6px" }}
              src=""
              alt="..."
            />
          </div>
          {/* <div className="flex justify-between mt-4 ">
            <div className="flex gap-3" style={{ alignItems: "center" }}>
              <span
                style={{
                  background: checkListData?.roomIsNotVacuumed?.status
                    ? "#E8F5ED"
                    : "#FBECEC",

                  height: "40px",
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
                }}
              >
                {checkListData?.roomIsNotVacuumed?.status === true ? (
                  <LikeFilled style={{ color: "#27AE60" }} />
                ) : (
                  <DislikeFilled style={{ color: "#EB5757" }} />
                )}
              </span>
              <p className="font-bold">
                {" "}
              Is Report 
              </p>
            </div>
            <img
              style={{ height: 40, width: 50, borderRadius: "6px" }}
              src=""
              alt="..."
            />
          </div> */}
          <br />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
