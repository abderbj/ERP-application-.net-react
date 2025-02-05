import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Products from './Pages/Products/Products';
import Orders from './Pages/Order/Orders.jsx';
import { useEffect, useState } from 'react';
import './App.css';
import About from './Pages/About/About.jsx';
import OrderCalendar from './Pages/OrderCalendar/OrderCalendar.jsx';
import AddUser from './Pages/User/Add'; // Import AddUser component
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/Product');  
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/Order");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      try {
        setUserId(JSON.parse(storedUserId));
      } catch (error) {
        console.error("Error parsing userId from localStorage:", error);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Header userId={userId} setUserId={setUserId} open={open} setOpen={setOpen} />
      <Routes>
        <Route path="/" element={<Dashboard userId={userId} setUserId={setUserId} open={open} setOpen={setOpen} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />} />
        <Route path="/about" element={<About />} />
        {userId ? (
          <>
            <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
            <Route path="/orders" element={<Orders orders={orders} setOrders={setOrders} />} />
            <Route path="/orderscalendar" element={<OrderCalendar orders={orders} setOrders={setOrders} />} />
            <Route path="/add-user" element={<AddUser />} /> {/* Add User Route */}
          </>
        ) : (
          <Route path="/" element={<Dashboard userId={userId} setUserId={setUserId} products={products} orders={orders} setOrders={setOrders}/>} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
