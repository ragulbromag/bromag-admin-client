import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUserValues } from "../redux/adminUserSlice";
import {  get } from "lodash";

function Sidenavbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [data, setData] = useState(false);

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
      setData(get(result, "data"));
      dispatch(changeUserValues(get(result, "data")));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div
      onClick={() => {
        Cookies.remove("token");
        localStorage.removeItem("token");
        navigate("/login");
      }}
    >
      Sidenavbar
    </div>
  );
}

export default Sidenavbar;
