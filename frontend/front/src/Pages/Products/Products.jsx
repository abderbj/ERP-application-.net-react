import React, { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../db/db.js";
import Swal from 'sweetalert2';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import UserHeader from "./UserHeader.jsx";
import axios from 'axios';

const Products = ({ products, setProducts }) => {
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Get products from the .NET backend API
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

  // Edit product
  const handleEdit = (id) => {
    const [product] = products.filter((product) => product.id === id);
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // Delete product
  // Delete product
const handleDelete = async (id) => {
  const [productToDelete] = products.filter((product) => product.id === id);

  const result = await Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "red",
    cancelButtonText: "No, cancel!",
  });

  if (result.isConfirmed) {
    try {
      // Make a DELETE request to the API
      await axios.delete(`http://localhost:4000/api/Product/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `${productToDelete.name} from ${productToDelete.category} has been deleted.`,
        showConfirmButton: false,
        timer: 1500,
      });

      // Update the state to remove the deleted product
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product: ", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: `Could not delete ${productToDelete.name}. Please try again later.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};


  return (
    <div className="container" style={{ marginTop: "70px" }}>
      {!isAdding && !isEditing && (
        <>
          <UserHeader setIsAdding={setIsAdding} />
          <Table
            products={products}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          products={products}
          setProducts={setProducts}
          setIsAdding={setIsAdding}
          getProducts={getProducts}
        />
      )}
      {isEditing && (
        <Edit
          products={products}
          selectedProduct={selectedProduct}
          setProducts={setProducts}
          setIsEditing={setIsEditing}
          getProducts={getProducts}
        />
      )}
    </div>
  );
};

export default Products;
