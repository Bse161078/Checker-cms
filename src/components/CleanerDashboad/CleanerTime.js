import { Avatar, Button, Col, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import Logo from "../../image/checkerdark.png";
import axios from "axios";
import { BASEURL } from "../../constants";
import Navigation from "../../components/Navigation";

import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CleanerNavigation from "./CleanerNavigation";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const CleanerTime = () => {
  const { token } = theme.useToken();
  const [Level, setLevel] = useState();
  const [rooms, setRooms] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTimeId, setStartTimeId] = useState(false);
  const [startCleaning,setStartCleaning] = useState("Start Cleaning")
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      setIntervalId(
        setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000)
      );
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);
  const handleStart = () => {
    setIsRunning(true);
    axios
      .post(
        `${BASEURL}/room/start-cleaning`,
        { roomId: localStorage.getItem("roomId") },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        setStartTimeId(res);
        toast("Timer Start Successfully!", {
          icon: "👏",
          style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors?.title);
        // setLoading(false);
      });
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    axios
      .post(
        `${BASEURL}/room/update-cleaning`,
        {
          cleaningHistoryId: startTimeId.data.data.data._id,
          status: "IN_PROGRESS",
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        toast("Timer Pause Successfully!", {
          icon: "👏",
          style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors?.title);
        // setLoading(false);
      });
  };
  const handleResume = () => {
    setIsRunning(true);

    // setTime(0);
    clearInterval(intervalId);
    axios
      .post(
        `${BASEURL}/room/update-cleaning`,
        {
          cleaningHistoryId: startTimeId.data.data.data._id,
          status: "START",
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        setStartTimeId(res);
        toast("Timer Start Successfully!", {
          icon: "👏",
          style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors?.title);
        // setLoading(false);
      });
  };
  const handleReset = () => {
    // setTime(0);
    setIsRunning(false);
    clearInterval(intervalId);
    axios
      .post(
        `${BASEURL}/room/update-cleaning`,
        {
          cleaningHistoryId: startTimeId.data.data.data._id,
          status: "CLEANED",
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        navigate("/cleaner-dashboard");
        toast("Timer Pause Successfully!", {
          icon: "👏",
          style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors?.title);
        // setLoading(false);
      });
  };
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const Token = localStorage.getItem("Token");
  const getrooms = () => {
    axios
      .get(`${BASEURL}/room`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log({ response }, "response");
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
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    getLevel();
    getrooms();
    IsImLoggedIn();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full">
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
        <div className="container">
          {/* <Col span={24}> */}
          <h2 className=" text-center " style={{ fontSize: "3rem" }}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h2>
          {/* </Col> */}
          <div className="container text-center mt-4">
            {isRunning === false && (
              <Button
                className="lg-button bg-green-100 text-green-500 px-2 py-2 rounded-md "
                onClick={() => {
                  setStartCleaning("Resume Cleaning")
                  if (startCleaning.includes("Start")) {
                      handleStart()
                  } else {
                    handleResume()
                  }
              }}
              
              >
                {startCleaning}{" "}
              </Button>
            )}
            <br />
            {isRunning === true && (
              <Button
                className="lg-button bg-green-100 text-green-500 px-2 py-2 rounded-md"
                onClick={handlePause}
              >
                Pause Cleaning
              </Button>
            )}
            <br />
            {isRunning === true && (
              <Button
                className="lg-button bg-red-100 text-red-500 px-2 py-2 rounded-md"
                onClick={handleReset}
              >
                End Cleaning
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanerTime;
