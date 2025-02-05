import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./Dashboard.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../db/db.js";
import Tooltip from "@mui/material/Tooltip";
import DatePicker from "react-datepicker"; // Install this library using npm or yarn
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = ({
  userId,
  setUserId,
  orders,
  open,
  products,
  setProducts,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  useEffect(() => {
    setProducts(products);
  }, []);

  // Calculate total number of products
  const totalProducts = products.length;

  // Calculate total number of categories (assuming categories are unique)
  const categories = [...new Set(products.map((product) => product.category))];
  const totalCategories = categories.length;

  // Calculate total number of orders
  const totalOrders = orders.length;
  useEffect(() => {
    userId = localStorage.getItem("userId");
  }, []);

  // Count the number of orders for each date
  const ordersByDate = orders.reduce((acc, order) => {
    const orderDate = order.orderDate;
    acc[orderDate] = (acc[orderDate] || 0) + 1;
    return acc;
  }, {});

  // Format data for LineChart
  const chartData = Object.keys(ordersByDate).map((orderDate) => ({
    date: orderDate,
    orders: ordersByDate[orderDate],
  }));

  // Generate numeric IDs for each product
  const productsWithNumericIds = products.map((product, index) => ({
    ...product,
    numericId: index + 1, 
  }));

  // Function to get the start and end dates of each week
  const getWeekRange = (startDate, endDate) => {
    const weekRange = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(currentDate);
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
      weekRange.push({ startDate: startOfWeek, endDate: endOfWeek });
      currentDate.setDate(currentDate.getDate() + 7);
    }
    return weekRange;
  };

  // Get the start and end dates of each week in the month
  const startDate = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1
  ); // Start of the month
  const endDate = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ); // End of the month
  const weeksInMonth = getWeekRange(startDate, endDate);

  // Filter chartData to include data for each week
  const chartDataMonthly = weeksInMonth.map((week) => {
    const weekOrders = chartData.filter((data) => {
      const orderDate = new Date(data.date);
      return orderDate >= week.startDate && orderDate <= week.endDate;
    });
    const totalOrders = weekOrders.reduce(
      (total, data) => total + data.orders,
      0
    );
    return {
      date: `${week.startDate.toLocaleDateString()} - ${week.endDate.toLocaleDateString()}`,
      orders: totalOrders,
    };
  });

  return (
    <div className="d-flex flex-column justify-content-between" style={{height:"100vh"}}>
      <div
        style={{ marginTop: "34px" }}
        className={
          open
            ? "dashboard-container move-right"
            : "container-fluid dashboard-container"
        }
      >
        <main className="main-container">
          <div className="main-title">
            <h3>DASHBOARD</h3>
          </div>

          <div className="main-cards">
            {userId && userId ? (
              <Link to="/products" style={{ textDecoration: "none" }}>
                <Tooltip title="Show Products">
                  <div className="card">
                    <div className="card-inner">
                      <h3>Products</h3>
                      <BsFillArchiveFill className="card_icon" />
                    </div>
                    <h1>{totalProducts}</h1>
                  </div>
                </Tooltip>
              </Link>
            ) : (
              <>
                <Link
                  to="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    alert("Please Login for going to Product page");
                  }}
                >
                  <div className="card">
                    <div className="card-inner">
                      <h3>Products</h3>
                      <BsFillArchiveFill className="card_icon" />
                    </div>
                    <h1>{totalProducts}</h1>
                  </div>
                </Link>
              </>
            )}

            <div className="card">
              <div className="card-inner">
                <h5>Category</h5>
                <BsFillGrid3X3GapFill className="card_icon" />
              </div>
              <h1>{totalCategories}</h1>
            </div>

            {userId && userId ? (
              <Link to="/orders" style={{ textDecoration: "none" }}>
                <div className="card">
                  <div className="card-inner">
                    <h3>Orders</h3>
                    <BsPeopleFill className="card_icon" />
                  </div>
                  <h1>{totalOrders}</h1>
                </div>
              </Link>
            ) : (
              <>
                <Link
                  to="#"
                  style={{ textDecoration: "none",cursor:"pointer" }}
                  onClick={() => {
                    alert("Please Login for going to Orders page");
                  }}
                >
                  <div className="card">
                    <div className="card-inner">
                      <h3>Orders</h3>
                      <BsPeopleFill className="card_icon" />
                    </div>
                    <h1>{totalOrders}</h1>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Add charts or other visualization components as needed */}

          <div className="charts mb-5">
            <div className="d-flex flex-column">
              <strong className="py-1 px-2">
                •Matrix on price and total number of stock Quantity of products
              </strong>
              <ResponsiveContainer
                width="100%"
                height={300}
                style={{ marginTop: "60px" }}
              >
                <BarChart
                  width={500}
                  height={300}
                  data={productsWithNumericIds}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="numericId" />
                  <YAxis />
                  <Legend />
                  <Bar dataKey="price" fill="#8884d8" />
                  <Bar dataKey="stock" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="ordergraph mt-1">
              <strong className="py-1 px-2">
                •Matrix on date and number of orders
              </strong>
              <div style={{ marginBottom: "20px", textAlign: "right" }}>
                <strong>Pick a Date : </strong>
                <DatePicker
                  selected={selectedMonth}
                  onChange={(date) => setSelectedMonth(date)}
                  dateFormat="dd-MM-yyyy"
                  showMonthYearPicker
                />
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartDataMonthly}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />

                  <YAxis />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;