import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalPage = ({show,selectedOrder,handleClose}) => {

  //modal to show order's details
  return (
    <div>
      {selectedOrder && (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <div className="order-details pb-5">
          <p>
            <strong>Order ID:</strong> {selectedOrder.orderId}
          </p>
          <p>
            <strong>Customer Name:</strong> {selectedOrder.customerName}
          </p>
          <p>
            <strong>Order Date:</strong> {selectedOrder.orderDate}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.status}
          </p>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </div>
        </Modal>
      )}
    </div>
  )
}

export default ModalPage

