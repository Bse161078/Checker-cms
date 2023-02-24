import { Avatar, Space, Table } from "antd";
import React,{useState,useEffect} from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { BASEURL } from "../../constants";


const CleanerProfile = (props) => {
  const { state } = useLocation();
  const {cleanerRecord} = state;
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  const [cleaners,setCleaner] = useState();
  const filteredRoomsCleaned = cleanerRecord?.rooms?.reduce(
    (acc, obj) => {
        if (obj.cleaning_status === "Cleaned") {
          acc.push(obj);
        }
    
      return acc;
    },
    []
  );
  const filteredRoomsExtra = cleanerRecord?.rooms?.reduce(
    (acc, obj) => {
        if (obj.roomType.includes("extra")) {
          acc.push(obj);
        }
    
      return acc;
    },
    []
  );
console.log('cleaerRecord',cleanerRecord)
const cleanedRoomsCount = cleanerRecord?.rooms.filter(room => room.cleaning_status === "Cleaned").length;

  const getReports = () => {
    
    axios
      .get(`${BASEURL}/room/report`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setCleaner(response.data.data.cleanersReport);
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
      title: "Room Number",
      dataIndex: "age",
      key: "age",
      render: (_, i, ind) => {
        return <span>{i?.name}</span>;
      },
    },

    {
      title: "",
      dataIndex: "profile",
      key: "profile",
      render: (_, record) => (
        <Space size="middle"onClick={()=>{
          navigate('/room-details',{state:{cleanerRecord:record}})
        }}>
          <a>Room Details</a>
        </Space>
      ),
    },
  ];
  return (
    <>
    {cleaners?<div className="flex flex-col justify-center items-center w-full ">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <div className="div" style={{ width: "80%" }}>
        <div style={{ textAlign: "center" }}>
          <Avatar size={"large"} src={BASEURL+"/"+cleanerRecord?.avatar} />
          <p className="text-md font-bold">{cleanerRecord?.fullname}</p>
          {/* <p className="text-md font-bold">
            <MailOutlined style={{ color: "#0BBBEF" }} /> hamzah@checker.com{" "}
            <PhoneOutlined style={{ color: "#0BBBEF" }} /> +971 55 9994444
          </p> */}
        </div>
        <br />

        <div class="flex flex-wrap -mx-1 w-full">
          <div class="w-full md:w-1/3 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div style={{ color: "#0BBBEF" }}>Rooms Cleaned</div>
                <br />

                <p className="text-lg"> {cleanedRoomsCount}</p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div style={{ color: "#0BBBEF" }}>Extra Beds</div>
                <br />

                <p className="text-lg">{cleanerRecord?.extra}</p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2">
            <div class="bgCard p-4">
              <div className=" text-lg font-bold ">
                <div style={{ color: "#0BBBEF" }}>Mistakes</div>
                <br />

                <p className="text-lg">{cleanerRecord?.mistakesCount}</p>
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
              dataSource={filteredRoomsCleaned}
              columns={columns}
            />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <p className="text-md font-bold">Extra Beds</p>
            <br />

            <Table
              className="w-full"
              dataSource={filteredRoomsExtra}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>:""}
    </>
  );
};

export default CleanerProfile;
