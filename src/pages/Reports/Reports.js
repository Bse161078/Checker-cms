import { Toaster, toast } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { Card, Progress, Space, Table, Tabs } from "antd";
import "../../App.css";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Reports = () => {
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
      title: "Name",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Room Cleaned",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Extra",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mistakes",
      dataIndex: "address",
      key: "address",
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
        <TabPane tab="Today" key="1">
          <Card>
            <div class="container mx-auto">
              <div class="flex flex-wrap -mx-1">
                <div
                  class="w-full md:w-1/3 px-2"
                  onClick={() => navigate("/CleanersUsed")}
                >
                  <div class="bgCard p-4">
                    <p className="fs-bl-20">Cleaners Used</p>
                    <h4>27</h4>
                  </div>
                </div>
                <div class="w-full md:w-1/3 px-2">
                  <div
                    class="bgCard p-4"
                    onClick={() => {
                      navigate("/roomCleaned");
                    }}
                  >
                    <p className="fs-bl-20">Rooms Cleaned</p>
                    <h4>36 </h4>
                  </div>
                </div>
                <div class="w-full md:w-1/3 px-2">
                  <div
                    class="bgCard p-4"
                    onClick={() => {
                      navigate("/conversationRates");
                    }}
                  >
                    <p className="fs-bl-20">Conversions</p>
                    <h4>$125.00</h4>
                  </div>
                </div>
              </div>
              <br />
              <p className="font-bold text-lg">Rooms: Cleaning Status</p>
              <br />
              <div class="flex flex-wrap -mx-1">
                <div class="w-full md:w-1/2 px-2">
                  <div class="bgCard p-4">
                    <div className="flex text-lg font-bold ">
                      <div style={{ minWidth: "170px" }}>In Progress </div>

                      <Progress
                        percent={30}
                        size="large"
                        className="blackProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <div className="flex text-lg font-bold ">
                      <div style={{ minWidth: "170px" }}>Cleaned </div>

                      <Progress
                        percent={30}
                        size="large"
                        className="greenProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <div className="flex text-lg font-bold ">
                      <div style={{ minWidth: "170px" }}>Not Cleaned </div>

                      <Progress
                        percent={30}
                        size="large"
                        className="redProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <p className="text-right">Number of rooms</p>
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-2">
                  <div class="bgCard p-4">
                    <div className="flex text-lg font-bold ">
                      <div style={{ minWidth: "170px" }}>No Damages</div>

                      <Progress
                        percent={30}
                        size="large"
                        className="greenProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <div className="flex text-lg font-bold ">
                      <div style={{ minWidth: "170px" }}>Damaged </div>

                      <Progress
                        percent={30}
                        size="large"
                        className="redProgress"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <p className="text-right">Number of rooms</p>
                  </div>
                </div>
              </div>
              <br />
              <p className="font-bold text-lg">Cleaners: Top Performers</p>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          </Card>
        </TabPane>
        <TabPane tab="This week" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="This Month" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reports;
