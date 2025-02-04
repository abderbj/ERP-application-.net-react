import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from 'axios';

const Edit = ({ products, selectedProduct, setProducts, setIsEditing, getProducts }) => {
  const id = selectedProduct.id;
  console.log(selectedProduct);
  
  
  const [name, setName] = useState(selectedProduct.productname);
  const [category, setCategory] = useState(selectedProduct.category);
  const [price, setPrice] = useState(selectedProduct.price);
  const [stock, setStock] = useState(selectedProduct.stockquantity);
  const stockLeft = selectedProduct.stockLeft;
  // Handle Update Product API request
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !category || !price || !stock) {
      return swal({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedProduct = {
      name,
      category,
      price,
      stock,
      stockLeft,
      id
    };
    console.log(updatedProduct);
    console.log(id);
    
    try {
      // Make a PUT request to the API endpoint to update the product
      const response = await axios.put(`http://localhost:4000/api/Product/${id}`, updatedProduct);

      // Update the local state with the updated product
      setProducts(products.map((product) => 
        product.id === id ? { ...product, ...updatedProduct } : product
      ));

      // Close the edit form
      setIsEditing(false);

      // Reload products if necessary
      getProducts();

      // Show success alert
      swal({
        icon: 'success',
        title: 'Updated!',
        text: `${name} of ${category}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating product: ", error);
      swal({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update the product. Please try again later.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Products</h1>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          autoComplete="off"
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          autoComplete="off"
          onChange={e => setCategory(e.target.value)}
        />
        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          autoComplete="off"
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="stock">Stock Quantity</label>
        <input
          id="stock"
          type="number"
          name="stock"
          value={stock}
          autoComplete="off"
          onChange={e => setStock(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <Button type='submit' variant="primary">Edit Product</Button>
          <input
            style={{ marginLeft: '12px', background:"#000",color:"#fff",padding:"7px 10px",borderRadius:"5px" , border:"none",outline:"none"}}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
