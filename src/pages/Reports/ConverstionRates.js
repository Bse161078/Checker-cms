import { Space, Table } from "antd";
import React,{useState,useEffect} from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../constants";

const ConverstionRates = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  const [cleaners,setCleaner] = useState(null);
  const getReports = () => {
    
    axios
      .get(`${BASEURL}/room/report`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setCleaner(response?.data?.data);
      });
  };
  console.log('cleaners',cleaners)
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
        return (
          <ul>
              <span>
                {i?.name}
              </span>
          
          </ul>
        );
      },
    },
    {
      title: "Cleaning Cost",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        return (
          <ul>
              <span>
                {i?.price?i?.price:"NA"}
              </span>
          
          </ul>
        );
      },
    },
    
  
    {
      title: "Room Details",
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
    <div className="flex flex-col justify-center items-center w-full">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <p className="font-bold text-lg">Cleaning Rates</p>
      <br />
      <br />
      <div class="container mx-auto " style={{ width: "80%" }}>
        <Table className="w-full" dataSource={cleaners?.roomsReport} columns={columns} />
      </div>
    </div>
  );
};

export default ConverstionRates;
