import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import axios from "axios";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Product Manager");

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      return swal("Error!", "All fields are required.", "error");
    }

    try {
      // Register user
      const registerResponse = await axios.post("http://localhost:4000/api/Account/register", { 
        email, 
        password 
      });

      if (registerResponse.status === 200) {
        // Assign role
        const roleResponse = await axios.post("http://localhost:4000/api/Account/assign-role", {
          email, 
          roleName: role 
        });

        if (roleResponse.status === 200) {
          swal("Success!", `${email} has been added as ${role}.`, "success");
          
          // Clear form fields after successful submission
          setEmail("");
          setPassword("");
          setRole("Product Manager");

        } else {
          throw new Error("Failed to assign role.");
        }
      } else {
        throw new Error("User registration failed.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      swal("Error!", `Failed to add the user. ${error.response?.data || error.message}`, "error");
    }
  };

  return (
    <div className="small-container" style={{ paddingLeft: "300px", paddingRight: "50px", paddingTop: "100px" }}>
      <form onSubmit={handleAddUser}>
        <h4>Add User</h4>

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Product Manager">Product Manager</option>
          <option value="Order Manager">Order Manager</option>
          <option value="Admin">Admin</option>
        </select>

        <div style={{ marginTop: "30px" }}>
          <Button type="submit" variant="success">Add User</Button>
          <button
            type="button"
            style={{
              marginLeft: "12px",
              background: "#000",
              color: "#fff",
              padding: "7px 10px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
