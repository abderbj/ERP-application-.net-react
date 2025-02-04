import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Products from './Pages/Products/Products';
import Orders from './Pages/Order/Orders.jsx';
import { useEffect, useState } from 'react';
import './App.css';
import About from './Pages/About/About.jsx';
import OrderCalendar from './Pages/OrderCalendar/OrderCalendar.jsx'
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([
    {
      id: 31,
      orderId: "ORD031",
      customerName: "Mason Sharma",
      orderDate: "2024-02-06",
      status: "Processing",
    },
  ]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      console.log("Fetching products...");
      
      const response = await axios.get('http://localhost:4000/api/Product');  // Adjust the URL to your API endpoint
      const fetchedProducts = response.data;  // Assuming the response contains an array of products
      console.log(response.data);
      
      // Update the products state with the fetched products
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
    useEffect(() => {
      getProducts();  // Fetch products when the component mounts
    }, []);
    
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/Order");
        setOrders(response.data);
        console.log("Orders fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders(); // Call the function inside useEffect
  }, []); // Add an empty dependency array to run it only once
  
  const [userId, setUserId] = useState(null);  
  //passing the userId as props



   //sidebar open
   const [open, setOpen] = useState(false);  

  //get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      try {
        // Parse the storedUserId to check if it's valid JSON
        const parsedUserId = JSON.parse(storedUserId);
        setUserId(parsedUserId);
        
      } catch (error) {
        // Handle parsing error (e.g., invalid JSON format)
        console.error("Error parsing userId from localStorage:", error);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Header userId={userId} setUserId={setUserId} open={open} setOpen={setOpen}/>
      <Routes>
        <Route path="/" element={<Dashboard userId={userId} setUserId={setUserId} open={open} setOpen={setOpen} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />} />
        <Route path="/about" element={<About />} />
        {userId ? (
          <>
            <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
            <Route path="/orders"  element={<Orders orders={orders} setOrders={setOrders} />} />
            <Route path="/orderscalendar" element={<OrderCalendar orders={orders} setOrders={setOrders}/>} />
          </>
        ) : (
          <Route path="/" element={<Dashboard userId={userId} setUserId={setUserId} products={products} orders={orders} setOrders={setOrders}/>} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
