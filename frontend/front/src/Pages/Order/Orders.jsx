import React, { useEffect, useRef, useState } from "react";
import "./Orders.css";
import Button from "react-bootstrap/Button";
import ModalPage from "./ModalPage";
import Swal from "sweetalert2";
import axios from "axios";

const Orders = ({ orders, setOrders }) => {
  // modal open
  const [show, setShow] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [editingStatusId, setEditingStatusId] = useState(null);
  const inputRef = useRef(null);

  const handleClose = () => setShow(false);

  // view order by specific id
  const handleViewDetails = (orderId) => {
    const order = orders.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
    setShow(true);
  };

  // update orders status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/Order/update-status/${orderId}`,
        newStatus,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        const updatedOrders = orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrders(updatedOrders);
        setEditingStatusId(null); // Reset the editing status ID
        Swal.fire("Success", "Order status updated!", "success");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire("Error", "Failed to update order status.", "error");
    }
  };

  const handleStartEditingStatus = (orderId, currentStatus) => {
    setEditingStatusId(orderId);
    setNewStatus(currentStatus);
  };

  // delete order
  const handleDeleteOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:4000/api/Order/${orderId}`
          );
          if (response.status === 200) {
            const updatedOrders = orders.filter(
              (order) => order.orderId !== orderId
            );
            setOrders(updatedOrders);
            setSelectedOrder(null);
            Swal.fire("Deleted!", "Your order has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire("Error", "Failed to delete order.", "error");
        }
      }
    });
  };

  useEffect(() => {
    if (editingStatusId !== null) {
      inputRef.current.focus();
    }
  }, [editingStatusId]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if month < 10
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if day < 10
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="orders-container mt-5 container">
      <h4>
        Orders List
      </h4>
      <div className="contain-table">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{formatDate(order.orderDate)}</td> {/* Format the date */}
                <td>
                  {editingStatusId === order.orderId ? (
                    <select
                      ref={inputRef}
                      style={{
                        border: "2px solid grey",
                        cursor: "pointer",
                      }}
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      onBlur={() => handleUpdateStatus(order.orderId, newStatus)}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Not Confirmed">Not Confirmed</option>
                      <option value="Shipped">Shipped</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
                <td className="px-3">
                  <Button
                    className="mx-2 mb-2"
                    variant="success"
                    onClick={() => handleViewDetails(order.orderId)}
                  >
                    View Details
                  </Button>
                  <Button
                    style={{ whiteSpace: "nowrap" }}
                    className="mx-2 mb-2"
                    variant="warning"
                    onClick={() => handleStartEditingStatus(order.orderId, order.status)}
                  >
                    Update Status
                  </Button>
                  <Button
                    className="mx-2 mb-2"
                    variant="danger"
                    onClick={() => handleDeleteOrder(order.orderId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalPage show={show} selectedOrder={selectedOrder} handleClose={handleClose} />
    </div>
  );
};

export default Orders;
