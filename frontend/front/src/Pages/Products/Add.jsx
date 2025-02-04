import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from 'axios';

const Add = ({ products, setProducts, setIsAdding, getProducts }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setstock] = useState('');

  // Handle Add Product API request
  const handleAdd = async (e) => {
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

    const newProduct = {
      name,
      category,
      price,
      stock,
      "stockLeft" : stock
    };

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post('http://localhost:4000/api/Product', newProduct);

      // Assuming the API responds with the newly created product data
      setProducts([...products, response.data]);

      // Close the add product form
      setIsAdding(false);

      // Reload products if necessary
      getProducts();

      // Show success alert
      swal({
        icon: 'success',
        title: 'Added!',
        text: `${name} of ${category}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding product: ", error);
      swal({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add the product. Please try again later.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form>
        <h4>Add Products</h4>
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
          onChange={e => setstock(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <Button type='submit' variant="success" onClick={handleAdd}>Add Product</Button>
          <input
            style={{ marginLeft: '12px', background:"#000",color:"#fff",padding:"7px 10px",borderRadius:"5px" , border:"none",outline:"none"}}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
