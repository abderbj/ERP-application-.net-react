import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Header = ({ userId, setUserId ,open , setOpen }) => {
  const [user, setUser] = useState({
    userName: "test",
    password: "test12345",
  });
  const navigate = useNavigate();
 

  //modal open
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const openSidebar = () => {
    setOpen(!open);
  };

  const formHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  //modal opan & close handling
  const handleShow = async () => {
    setShow(true);
  };


  //login function
  const userLogin = async (e) => {
    e.preventDefault();
    if (user.userName === "" || user.password === "") {
      alert("Please enter both email and password");
    } else if (user.userName === "test" && user.password === "test12345") {
      // Set user ID in localStorage
      const newUserId = Math.random().toString(36).substring(7);
      localStorage.setItem("userId", JSON.stringify(newUserId));
      setUserId(newUserId);
      console.log(newUserId);
      // Update the user state with the entered username
      setUser({ ...user });
      // Redirect to dashboard after successful login
      navigate("/products");
      setShow(false);
    } else {
      alert("Invalid email or password");
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && !userId) {
      // Check if userId is not already set
      setUserId(storedUserId);
    }
  }, [userId]); // Add userId as a dependency



  //logout function
  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "Once logged out, you will need to log in again to access the content!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        // Remove user ID from localStorage
        localStorage.removeItem("userId");
        setUserId(null);
        // Reset the user state
        setUser({
          userName: "",
          password: "",
        });
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
          zIndex: "100"
        }}
      >
        <h3>
          <Link
            to="#"
            style={{ textDecoration: "none", color: "white" }}
          >
            ERP SYSTEM
          </Link>
        </h3>

        <div
          className="d-flex flex-row"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {localStorage.getItem("userId") ? ( // If user ID exists in localStorage (user is logged in)
            <Button
              onClick={handleLogout}
              className="px-3 py-1 mx-3 btn btn-success"
            >
              Logout
            </Button>
          ) : (
            // If user ID does not exist in localStorage (no user logged in)
            <Button
              onClick={handleShow}
              className="px-3 py-1 mx-3 btn btn-success"
            >
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

      {/* login modal */}
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
                name="userName"
                placeholder="write usename"
                value={user.userName}
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
      {/* login modal */}

      {/* sidebar */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        userId={userId}
        setUserId={setUserId}
      />
    </>
  );
};

export default Header;
