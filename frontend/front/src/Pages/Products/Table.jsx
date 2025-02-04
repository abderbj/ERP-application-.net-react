import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const Table = ({ products, handleEdit, handleDelete }) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });


  //list of products
  return (
    <div className="contain-table">
      <table className="striped-table mb-4">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Id</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((product, i) => (
              <tr key={product.id}>
                <td>{i+1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className="px-5">
                  <Button variant="secondary"
                    onClick={() => handleEdit(product.id)}
                    className="button muted-button mx-3 mb-2"
                  >
                    Edit
                  </Button>
                
                  <Button variant="danger"
                    onClick={() => handleDelete(product.id)}
                    className="button muted-button mb-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{textAlign:"center"}}><strong>No data is present</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
