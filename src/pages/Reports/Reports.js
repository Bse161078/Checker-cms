import { Toaster, toast } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { Card, Progress, Space, Table, Tabs, theme } from "antd";
import "../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../constants";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key,"key");
}



const Reports = () => {
  const { token } = theme.useToken();
  const Token = localStorage.getItem("Token");
  const [cleaner, setCleaner] = useState();
  const totalConversions = cleaner?.roomsReport?.map((room)=>{
    return room?.price || 0;
  }).reduce((total, price) => total + price, 0);
  const navigate = useNavigate();
  
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
      title: "Rooms Status",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        const filteredRooms = i?.rooms.filter((room) => room?.cleaning_status);
        return (
          <span>
            {filteredRooms?.map((room, index) => (
              <p key={index}>{room.cleaning_status}</p>
            ))}
          </span>
        );
      },
    },
    {
      title: "Extra Beds",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        return <span>{i?.extra}</span>;
      },
    },
    {
      title: "Mistakes",
      dataIndex: "address",
      key: "address",
      render: (_, i, ind) => {
        return <span>{i?.mistakesCount}</span>;
      },
    },
    {
      title: "",
      dataIndex: "profile",
      key: "profile",
      render: (_, record,index) => (
        
        <Space size="middle" onClick={()=>{
          
          navigate(`/cleaner-profile`,{state:{cleanerRecord:record}})
        }}>
          <a>View Profile</a>
        </Space>
        
      ),
    },
  ];
  console.log('cleaners',cleaner)
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
    <div className="flex flex-col justify-center items-center w-full">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <br />
      <Tabs
        className=" w-full align-right-tab"
        defaultActiveKey="1"
        onChange={callback}
        type="card"
      >
        <TabPane tab="Report" key="1">
          <Card>
            <div class="container mx-auto">
              <div class="flex flex-wrap -mx-1">
                <div
                  class="w-full md:w-1/3 px-2"
                  style={{cursor:'pointer'}}
                  onClick={() => navigate("/CleanersUsed")}
                >
                  <div class="bgCard p-4">
                    <p className="fs-bl-20">Cleaners Used</p>
                    <h4>{cleaner?.cleanersUsed}</h4>
                  </div>
                </div>
                <div class="w-full md:w-1/3 px-2">
                  <div
                    class="bgCard p-4"
                    style={{cursor:'pointer'}}
                    onClick={() => {
                      navigate("/roomCleaned");
                    }}
                  >
                    <p className="fs-bl-20">Rooms Cleaned</p>
                    <h4>{cleaner?.roomsCleaned} </h4>
                  </div>
                </div>
                <div class="w-full md:w-1/3 px-2">
                  <div
                    class="bgCard p-4"
                     style={{cursor:'pointer'}}
                    onClick={() => {
                       navigate("/conversationRates");
                    }}
                  >
                    <p className="fs-bl-20">Total Cost</p>
                    <h4>{totalConversions} </h4>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div class="flex flex-wrap -mx-1">
                <div class="w-full md:w-1/2 px-2">
                  <p className="font-bold text-lg">Rooms: Cleaning Status</p>
                  <br />
                  <div
                    class="bgCard p-4"
                    style={{cursor:'pointer'}}
                    onClick={() => navigate("/cleaningStatus")}
                  >
                    <div className="flex text-lg text-green-500 font-bold ">
                      <div style={{ minWidth: "170px" }}>In Progress </div>

                      <Progress
                        percent={cleaner?.roomsInProgress}
                        size="large"
                        className="blackProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <div className="flex text-lg text-blue-500 font-bold ">
                      <div style={{ minWidth: "170px" }}>Cleaned </div>

                      <Progress
                        percent={cleaner?.roomsCleaned}
                        size="large"
                        className="greenProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <div className="flex text-lg text-red-500 font-bold ">
                      <div style={{ minWidth: "170px" }}>Not Cleaned </div>

                      <Progress
                        percent={cleaner?.roomsNotCleaned}
                        size="large"
                        className="redProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-2" style={{cursor:'pointer'}} onClick={()=>{
                    navigate("/room-damages",{state:{roomReport:cleaner}})
                  }}>
                  <p className="font-bold  text-lg"
                  
                  >Rooms: Damages</p>
                  <br />
                  <div class="bgCard p-4">
                    <div className="flex text-lg text-green-500 font-bold ">
                      <div style={{ minWidth: "170px" }}>No Damages</div>

                      <Progress
                        percent={cleaner?.notDamaged}
                        size="large"
                        className="greenProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <div className="flex text-lg text-red-500 font-bold ">
                      <div style={{ minWidth: "170px" }}>Damaged </div>

                      <Progress
                        percent={cleaner?.roomsDamaged}
                        size="large"
                        className="redProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <p className="font-bold text-lg">Cleaners: Top Performers</p>
              <Table dataSource={cleaner?.cleanersReport} columns={columns} />
            </div>
          </Card>
        </TabPane>
        {/* <TabPane tab="This week" key="2">
        </TabPane>
        <TabPane tab="This Month" key="3">
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default Reports;
