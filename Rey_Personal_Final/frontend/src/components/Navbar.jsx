import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { httpRequest } from "@/utils";

function Navbar() {
  const [me, setMe] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);


  // get current user info
  const getMe = async () => {
    const data = await httpRequest("/current_user/", "GET", {}, true);
    console.log("data", data);
    if (data?.code || !data) {
      navigate("/login");
    } else {
      localStorage.setItem("data", JSON.stringify(data));
      setMe(data);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  // clear the cache and back to the login page
  const logout = async () => {
    localStorage.clear();
    setToken(null);
    navigate("/login");
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <Row className="mb-3 d-flex align-items-center ">
      <img src="/logo.png" alt="logo" style={{ width: 120 }} />
      <Col className="nav" style={{ minWidth: 800 }}>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/order">
            Order
          </a>
        </li>
      </Col>
      <Col>
        <b style={{ cursor: "pointer", marginRight: 24 }}>{me.username}</b>
        {token ? (
          <button
            id="logout"
            type="button"
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        ) : null}
        {!token ? (
          <button
            id="login"
            type="button"
            className="btn btn-danger"
            onClick={login}
          >
            Login
          </button>
        ) : null}
      </Col>
    </Row>
  );
}

export default Navbar;
