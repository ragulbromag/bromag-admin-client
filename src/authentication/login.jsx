import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { changeUserValues } from "../redux/adminUserSlice";
import { isEmpty, get } from "lodash";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  console.log(user);

  const handleFinish = async (values) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_URL}/create`, {
        values,
      });
      localStorage.setItem("token", get(result, "data.message"));
      Cookies.set("token", get(result, "data.message"));
      setData(get(result, "data.message"));
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (req, res) => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/validateToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      navigate("/");
    }
  }, [navigate, data]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-between ">
      <div className="text-white border-r-2 h-[70vh] border-slate-400 flex items-center justify-center  w-[45%]">
        Logo
      </div>

      <div className="pr-32">
        <Form
          className="md:w-[35vw] lg:w-[30vw] xl:w-[24vw] rounded-md bg-white/20 shadow-md backdrop-blur-sm flex flex-col  px-4 gap-4 py-5 !text-white"
          layout="vertical"
          onFinish={handleFinish}
        >
          <div className="text-center">
            <h1 className="text-xl">Welcome</h1>
            <p className="pt-2">Login to admin dashboard</p>
          </div>
          <Form.Item
            name="name"
            label={<p className="!text-white">Username</p>}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input type="text" placeholder="Username..." size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<p className="!text-white">password</p>}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              type="text"
              placeholder="Password..."
              size="large"
            />
          </Form.Item>

          <div className="flex flex-col items-center justify-center">
            <Form.Item>
              <Button
                htmlType="submit"
                className="!w-[18vw] !text-white"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
            <p className="cursor-pointer">Forgotten your Password&nbsp;?</p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
