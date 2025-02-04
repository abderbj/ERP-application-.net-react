import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './OrderCalendar.css';

function OrderCalendar({ orders }) {
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [selectedDateOrders, setSelectedDateOrders] = useState([]);

  // Calculate delivery dates based on order placement dates
  useEffect(() => {
    const calculatedDeliveryDates = orders.map((order) => {
      const orderDate = new Date(order.orderDate);
      const deliveryDate = new Date(orderDate.getTime() + 6 * 24 * 60 * 60 * 1000); // Add 6 days for delivery
      return {
        id: order.id,
        title: `Order ${order.orderId}`,
        start: deliveryDate.toISOString().split("T")[0], // Format delivery date to YYYY-MM-DD
      };
    });
    setDeliveryDates(calculatedDeliveryDates);
  }, [orders]);


    // Function to filter orders for the selected date
    const filterOrdersByDate = (date) => {
      const filteredOrders = orders.filter(order => order.orderDate === date);
      return filteredOrders;
    };

  return (
    <div className="my-5 container">
      <h4><strong>Orders calendar for expected Delivery date</strong></h4>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={deliveryDates}
        eventClick={(info) => {
          Swal.fire({
            title: `Order ${info.event.id}`,
            text: `Expected delivery date: ${info.event.start}`,
            icon: 'info',
          });
        }}
        dateClick={(info) => {
          const clickedDate = info.dateStr;
          const ordersForDate = filterOrdersByDate(clickedDate);
          setSelectedDateOrders(ordersForDate);
          // Display orders for the selected date
          if (ordersForDate.length > 0) {
            Swal.fire({
              title: `Orders for ${clickedDate} `,
              html: ordersForDate.map(order => `<div>${order.orderId} - ${order.customerName}</div>`).join(''),
              icon: 'info',
            });
          } else {
            Swal.fire({
              title: `No orders for ${clickedDate}`,
              icon: 'info',
            });
          }
        }}
      />
    </div>
  );
}

export default OrderCalendar;
