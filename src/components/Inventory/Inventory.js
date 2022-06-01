import React from 'react';
import fakeData from '../../fakeData'


const Inventory = () => {
      const handleAddProduct =()=>{
            fetch('https://frozen-refuge-86407.herokuapp.com/addProducts',{
                  method : 'POST',
                  headers :{
                        'content-type' :'application/json'
                  },
                  body : JSON.stringify(fakeData)
            })
      }
      return (
            <div>
            <form action="">
                  <p><span>Product Name</span><input type="text" /></p>
                  <p><span>Price</span><input type="text" /></p>
                  <p><span>Quantity</span><input type="text" /></p>
                  <p><span>Image</span><input type="file" /></p>
            </form>
                  <button onClick={handleAddProduct}>Add Products</button>
            </div>
      );
};

export default Inventory;