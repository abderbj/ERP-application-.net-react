import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const Header = ({ userId, setUserId, open, setOpen }) => {
  const [user, setUser] = useState({
    email: "test@example.com", // Updated to "email"
    password: "test12345",
  });

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const openSidebar = () => setOpen(!open);

  const formHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const userLogin = async (e) => {
    e.preventDefault();
  
    if (user.email === "" || user.password === "") {
      alert("Please enter both email and password");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/Account/login",
        {
          email: user.email, // Updated to "username"
          password: user.password,

        }
      );
  
      if (response.data.userId) {
        const newUserId = response.data.userId;
        localStorage.setItem("userId", JSON.stringify(newUserId));
        setUserId(newUserId);
        console.log("Login successful, User ID:", newUserId);
  
        setShow(false); // Close modal
        navigate("/"); // Redirect after login
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error during login:", error.response.data);
        alert(`Failed to log in: ${error.response.data.message || "Invalid request"}`);
      } else {
        console.error("Error during login:", error);
        alert("Failed to log in. Please try again.");
      }
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && !userId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "Once logged out, you will need to log in again to access the content!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        localStorage.removeItem("userId");
        setUserId(null);
        setUser({ email: "", password: "" });
        swal("You have been logged out successfully!", {
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      } else {
        swal("You are still logged in!");
      }
    });
  };

  return (
    <>
      <header
        className="header container-fluid px-4 py-3 text-white d-flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          background: "#060b26",
          zIndex: "100",
        }}
      >
        <h3>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            ERP SYSTEM
          </Link>
        </h3>

        <div
          className="d-flex flex-row"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {localStorage.getItem("userId") ? (
            <Button onClick={handleLogout} className="px-3 py-1 mx-3 btn btn-success">
              Logout
            </Button>
          ) : (
            <Button onClick={handleShow} className="px-3 py-1 mx-3 btn btn-success">
              Login
            </Button>
          )}
          <GiHamburgerMenu
            style={{
              marginRight: "10px",
              fontSize: "20px",
              textAlign: "center",
            }}
            onClick={openSidebar}
          />
        </div>
      </header>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control
      type="email"
      name="email" // Use "email" instead of "userName"
      placeholder="Enter your email"
      value={user.email}
      onChange={formHandle}
      autoComplete="off"
      required
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      name="password"
      placeholder="Type your password here..."
      value={user.password}
      onChange={formHandle}
      autoComplete="off"
      required
    />
  </Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={userLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Sidebar open={open} setOpen={setOpen} userId={userId} setUserId={setUserId} />
    </>
  );
};

export default Header;