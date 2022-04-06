import React from 'react';
import './Product.css'

const Product = (props) => {
      console.log(props.product);
      const{name,img,price, seller,stock} = props.product
      return (
            <div className='product'>
               <div>
                     <img src={img} alt="" />
               </div>
               <div>
                     <h2 className='product-name'>{name}</h2>
                     <p><small> By :{seller}</small></p>
                     <p>${price}</p>
                     <p>stock {stock} in avaiable </p>

               </div>  
            </div>
      );
};

export default Product;