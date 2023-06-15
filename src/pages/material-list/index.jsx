/* eslint-disable no-restricted-globals */
import { Button, Input, Modal, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../constants";
import { Toaster, toast } from "react-hot-toast";
import Navigation from "../../components/Navigation";
import { useNavigate } from "react-router-dom";

const MaterialList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [MaterialName, setMaterialName] = useState();
  const [MaterialDEName, setMaterialDEName] = useState();
  const [Price, setPrice] = useState(0);
  const [Quantity, SetQuantity] = useState();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "German Name",
      dataIndex: "name_de",
      key: "name_de",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, { _id }) => (
        <Space>
          <button
            className="bg-red-100 text-red-500 px-2 py-2 rounded-md"
            onClick={() => {
              handleDelete(_id);
            }}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`${BASEURL}/material-list/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        toast("delete successfully", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        window.setTimeout(function () {
          location.reload();
        }, 1500);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.errors.title);
      });
  };

  const Token = localStorage.getItem("Token");

  const CreateMaterial = () => {
    setLoading(true);
    axios
      .post(
        `${BASEURL}/material-list`,
        {
          price: Price,
          name: MaterialName,
          name_de: MaterialDEName,
          quantity: Quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        toast("Created Successfully!", {
          icon: "👏",
          style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
          },
        });
        setLoading(false);
        setIsModalOpen(false);
        window.setTimeout(function () {
          location.reload();
        }, 1500);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors?.message?err.response.data.errors.message:err.response.data.errors.title);
        setLoading(false);
      });
  };

  useEffect(() => {
    getrooms();
  }, []);

  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getrooms = () => {
    axios
      .get(`${BASEURL}/material-list`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response?.data?.data?.materials);
        console.log("materiallist",response?.data?.data)
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Navigation />
      <Toaster position="top-center" reverseOrder={true} />
      <section
        style={{ width: "1200px" }}
        className="flex flex-col justify-start items-start my-10 gap-y-4"
      >
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl text-black font-medium">Material List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-400 text-white rounded-lg shadow-inner text-lg px-4 py-2 hover:text-black delay-100 hover:shadow-lg"
          >
            Create Material
          </button>
        </div>
        <Table className="w-full" dataSource={users} columns={columns} />
      </section>
      <Modal
        title="Create Material"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            className="bg-blue-400 text-white hover:bg-white"
            key="link"
            loading={loading}
            onClick={CreateMaterial}
          >
            Create
          </Button>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Material Name
            </label>
            <Input
              onChange={(e) => {
                setMaterialName(e.target.value);
              }}
              placeholder="Chips"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">
              Material German Name
            </label>
            <Input
              onChange={(e) => {
                setMaterialDEName(e.target.value);
              }}
              placeholder="chipsingen"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Price</label>
            <Input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="10 Euro"
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <label className="w-full text-left font-semibold">Quantity</label>
            <Input
              onChange={(e) => {
                SetQuantity(e.target.value);
              }}
              placeholder="10"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MaterialList;
