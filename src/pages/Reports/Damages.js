import { Progress, Space, Table } from "antd";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { useLocation } from 'react-router-dom';


const Damages = () => {

  const { state } = useLocation();
  const {roomReport} = state;
  const navigate = useNavigate();
  const filteredRoomsDamaged = roomReport?.roomsReport?.reduce(
    (acc, obj) => {
        if (obj.cleaning_status === "Damaged") {
          acc.push(obj);
        }
    
      return acc;
    },
    []
  );
  const filteredRoomsNoDamaged = roomReport?.roomsReport?.reduce(
    (acc, obj) => {
        if (obj.cleaning_status !== "Damaged") {
          acc.push(obj);
        }
    
      return acc;
    },
    []
  );
 
  const columns = [
    {
      title: "No.",
      dataIndex: "name",
      key: "name",
      render: (_, row, ind) => {
        return <Space>{ind}</Space>;
      },
    },
    {
      title: "Room Number",
      dataIndex: "age",
      key: "age",
      render: (_, row) => {
        return (
          <Space>
            
            {row?.name}
          </Space>
        );
      },
    },
    {
      title: "Cleaners",
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
      title: "Extra Beds",
      dataIndex: "address",
      key: "address",
      render: (_, row) => {
        return (
          <Space>
            {row?.report.some((rep) => rep?.toLowerCase().includes("extra")) ? 1 : 0}
          </Space>

        );
      },
    },

    {
      title: "Room Details",
      dataIndex: "profile",
      key: "profile",
      render: (_, record) => (
        <Space size="middle" onClick={()=>{
          navigate('/room-details',{state:{cleanerRecord:record}})
        }}>
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

          <p className="text-lg font-bold">Rooms: Damages</p>
          <br />

          <div class="flex flex-wrap -mx-1">
            <div class="w-full md:w-1/3 px-2">
              <div
                class="bgCard p-4"
                onClick={() => {
                  navigate("/roomCleaned");
                }}
              >
                <div className=" text-lg font-bold ">
                  <div style={{ minWidth: "170px", color: "green" }}>
                    No Damages{" "}
                  </div>
                  <br />

                  <Progress
                    percent={filteredRoomsNoDamaged?.length}
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
                  <div style={{ color: "red", minWidth: "170px" }}>
                    Damaged{" "}
                  </div>
                  <br />

                  <Progress
                    percent={filteredRoomsDamaged?.length}
                    size="large"
                    className="redProgress"
                    style={{ height: "40px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <p className="text-lg font-bold" style={{ color: "green" }}>
            No Damages
          </p>

          <br />

          <Table className="w-full" dataSource={filteredRoomsNoDamaged} columns={columns} />
          <br />
          <p
            className="text-lg text-green-500 font-bold"
            style={{ color: "red" }}
          >
            Damaged
          </p>
          <br />
          <Table className="w-full" dataSource={filteredRoomsDamaged} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Damages;
