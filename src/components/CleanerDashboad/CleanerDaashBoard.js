import { Alert, Avatar, Button, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import Logo from "../../image/checkerdark.png";
import axios from "axios";
import { BASEURL } from "../../constants";
import Navigation from "../../components/Navigation";

import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import CleanerNavigation from "./CleanerNavigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Panel } = Collapse;

const CleanerDaashBoard = () => {
  const showToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const { token } = theme.useToken();
  const [Level, setLevel] = useState();
  const [rooms, setRooms] = useState();
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const filteredLevels =
    Level &&
    Level.filter((level) => {
      const filteredRooms = level.rooms.filter((room) => {
        return (
          room.name && room.name.toLowerCase().includes(search.toLowerCase())
        );
      });
      return filteredRooms.length > 0;
    });

  const Token = localStorage.getItem("Token");
  const getrooms = () => {
    axios
      .get(`${BASEURL}/room`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log(response?.data?.data?.rooms, "response");
        setRooms(response?.data?.data?.rooms);
      });
  };

  const getLevel = () => {
    axios
      .get(`${BASEURL}/level`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log({ response });
        setLevel(response?.data?.data?.levels);
      });
  };

  const IsImLoggedIn = () => {
    axios
      .get(`${BASEURL}/auth/check-login`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        if (response?.data?.statusCode === 200 || 201) {
          console.log(response, "response is Logged");
          // navigate("/");
          setUser(response.data.data.user);
        } else {
          // navigate("/login");
        }
      })
      .catch((err) => {
        // navigate("/login");
      });
  };
  useEffect(() => {
    getLevel();
    getrooms();
    IsImLoggedIn();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ToastContainer />
      <CleanerNavigation user={user} />
      <div className="w-full">
        <div className="flex items-center justify-center  mt-8">
          <Avatar
            style={{ height: "60px", width: "60px" }}
            size={"large"}
            src={BASEURL + "/" + user?.avatar}
            alt="..."
          />
        </div>
        <br />
        <div className="container">
          <div className="flex  w-full ">
            <div className="flex">
              <Input
                // value={searchValue}
                // onChange={e => setSearchValue(e.target.value)}
                placeholder="Search Room"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="bg-green-100 text-green-500 px-2 py-2 rounded-md">
                Search
              </button>
            </div>
          </div>
          <br />

          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
              background: token.colorBgContainer,
            }}
          >
            {filteredLevels?.map((el, ind) => {
              return (
                <Panel
                  header={"Level" + " " + el.title}
                  key={ind}
                  style={panelStyle}
                >
                  <div class="flex flex-wrap  -mx-1" style={{}}>
                    <div class="w-full flex " style={{ gap: "7px" }}>
                      {el?.rooms?.length > 0 ? (
                        el?.rooms.map((room, ind) => {
                          return (
                            <div
                              className="w-full md:w-1/3 px-2"
                              key={ind}
                              onClick={() => {
                                localStorage.setItem("roomId", room._id);
                                if (room.cleaning_status === "IN_PROGRESS") {
                                  showToast(
                                    "Room is already in progress! Please wait for checker response"
                                  );
                                } else if (room.cleaning_status === "Cleaned") {
                                  showToast("Room is already Cleaned!");
                                } else {
                                  navigate("/cleaner-time");
                                }
                              }}
                            >
                              <div
                                class="bgCard p-4"
                                style={{ cursor: "pointer" }}
                              >
                                <div className=" text-lg font-bold ">
                                  Room <div>{room.name}</div>
                                  <br />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <span>No rooms available</span>
                      )}
                    </div>
                  </div>
                </Panel>
              );
            })}
          </Collapse>
          {/* <Select placeholder="select room">
          <Select.Option value="Room1">Room1</Select.Option>
        </Select> */}
        </div>
      </div>
    </div>
  );
};

export default CleanerDaashBoard;
