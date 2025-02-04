import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Tooltip from "@mui/material/Tooltip";

const UserHeader = ({setIsAdding}) => {
  return (
    <>
      <header className='userHeader'>
      <h3>Product List<span style={{fontSize:"10px"}}>(values get from firestore)</span> </h3>
      <div style={{ marginTop: '18px', marginBottom: '18px' }}>
        <Tooltip title="Add Products">
        <Button  variant="outline-primary" onClick={() => setIsAdding(true)}>Add Products</Button >
        </Tooltip>
      </div>
    </header>

    </>
  )
}

export default UserHeader
